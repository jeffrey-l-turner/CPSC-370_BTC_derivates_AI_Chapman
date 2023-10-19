import { BigNumber } from '@ethersproject/bignumber';
import { Percent, TradeType } from '@uniswap/sdk-core';
import _ from 'lodash';
import { SwapType, WRAPPED_NATIVE_CURRENCY, } from '../../../..';
import { ChainId } from '../../../../util';
import { CurrencyAmount } from '../../../../util/amounts';
import { getHighestLiquidityV3NativePool, getHighestLiquidityV3USDPool, getL2ToL1GasUsed, } from '../../../../util/gas-factory-helpers';
import { log } from '../../../../util/log';
import { buildSwapMethodParameters, buildTrade, } from '../../../../util/methodParameters';
import { IOnChainGasModelFactory, } from '../gas-model';
import { BASE_SWAP_COST, COST_PER_HOP, COST_PER_INIT_TICK, COST_PER_UNINIT_TICK, } from './gas-costs';
/**
 * Computes a gas estimate for a V3 swap using heuristics.
 * Considers number of hops in the route, number of ticks crossed
 * and the typical base cost for a swap.
 *
 * We get the number of ticks crossed in a swap from the QuoterV2
 * contract.
 *
 * We compute gas estimates off-chain because
 *  1/ Calling eth_estimateGas for a swaps requires the caller to have
 *     the full balance token being swapped, and approvals.
 *  2/ Tracking gas used using a wrapper contract is not accurate with Multicall
 *     due to EIP-2929. We would have to make a request for every swap we wanted to estimate.
 *  3/ For V2 we simulate all our swaps off-chain so have no way to track gas used.
 *
 * @export
 * @class V3HeuristicGasModelFactory
 */
export class V3HeuristicGasModelFactory extends IOnChainGasModelFactory {
    constructor() {
        super();
    }
    async buildGasModel({ chainId, gasPriceWei, v3poolProvider: poolProvider, token, l2GasDataProvider, }) {
        const l2GasData = l2GasDataProvider
            ? await l2GasDataProvider.getGasData()
            : undefined;
        const usdPool = await getHighestLiquidityV3USDPool(chainId, poolProvider);
        const calculateL1GasFees = async (route) => {
            const swapOptions = {
                type: SwapType.UNIVERSAL_ROUTER,
                recipient: '0x0000000000000000000000000000000000000001',
                deadlineOrPreviousBlockhash: 100,
                slippageTolerance: new Percent(5, 10000),
            };
            let l1Used = BigNumber.from(0);
            let l1FeeInWei = BigNumber.from(0);
            if (chainId == ChainId.OPTIMISM || chainId == ChainId.OPTIMISTIC_KOVAN) {
                [l1Used, l1FeeInWei] = this.calculateOptimismToL1SecurityFee(route, swapOptions, l2GasData);
            }
            else if (chainId == ChainId.ARBITRUM_ONE ||
                chainId == ChainId.ARBITRUM_RINKEBY) {
                [l1Used, l1FeeInWei] = this.calculateArbitrumToL1SecurityFee(route, swapOptions, l2GasData);
            }
            // wrap fee to native currency
            const nativeCurrency = WRAPPED_NATIVE_CURRENCY[chainId];
            const costNativeCurrency = CurrencyAmount.fromRawAmount(nativeCurrency, l1FeeInWei.toString());
            // convert fee into usd
            const nativeTokenPrice = usdPool.token0.address == nativeCurrency.address
                ? usdPool.token0Price
                : usdPool.token1Price;
            const gasCostL1USD = nativeTokenPrice.quote(costNativeCurrency);
            let gasCostL1QuoteToken = costNativeCurrency;
            // if the inputted token is not in the native currency, quote a native/quote token pool to get the gas cost in terms of the quote token
            if (!token.equals(nativeCurrency)) {
                const nativePool = await getHighestLiquidityV3NativePool(token, poolProvider);
                if (!nativePool) {
                    log.info('Could not find a pool to convert the cost into the quote token');
                    gasCostL1QuoteToken = CurrencyAmount.fromRawAmount(token, 0);
                }
                else {
                    const nativeTokenPrice = nativePool.token0.address == nativeCurrency.address
                        ? nativePool.token0Price
                        : nativePool.token1Price;
                    gasCostL1QuoteToken = nativeTokenPrice.quote(costNativeCurrency);
                }
            }
            // gasUsedL1 is the gas units used calculated from the bytes of the calldata
            // gasCostL1USD and gasCostL1QuoteToken is the cost of gas in each of those tokens
            return {
                gasUsedL1: l1Used,
                gasCostL1USD,
                gasCostL1QuoteToken,
            };
        };
        // If our quote token is WETH, we don't need to convert our gas use to be in terms
        // of the quote token in order to produce a gas adjusted amount.
        // We do return a gas use in USD however, so we still convert to usd.
        const nativeCurrency = WRAPPED_NATIVE_CURRENCY[chainId];
        if (token.equals(nativeCurrency)) {
            const estimateGasCost = (routeWithValidQuote) => {
                const { totalGasCostNativeCurrency, baseGasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId);
                const token0 = usdPool.token0.address == nativeCurrency.address;
                const nativeTokenPrice = token0
                    ? usdPool.token0Price
                    : usdPool.token1Price;
                const gasCostInTermsOfUSD = nativeTokenPrice.quote(totalGasCostNativeCurrency);
                return {
                    gasEstimate: baseGasUse,
                    gasCostInToken: totalGasCostNativeCurrency,
                    gasCostInUSD: gasCostInTermsOfUSD,
                };
            };
            return {
                estimateGasCost,
                calculateL1GasFees,
            };
        }
        // If the quote token is not in the native currency, we convert the gas cost to be in terms of the quote token.
        // We do this by getting the highest liquidity <quoteToken>/<nativeCurrency> pool. eg. <quoteToken>/ETH pool.
        const nativePool = await getHighestLiquidityV3NativePool(token, poolProvider);
        const usdToken = usdPool.token0.address == nativeCurrency.address
            ? usdPool.token1
            : usdPool.token0;
        const estimateGasCost = (routeWithValidQuote) => {
            const { totalGasCostNativeCurrency, baseGasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId);
            if (!nativePool) {
                log.info(`Unable to find ${nativeCurrency.symbol} pool with the quote token, ${token.symbol} to produce gas adjusted costs. Route will not account for gas.`);
                return {
                    gasEstimate: baseGasUse,
                    gasCostInToken: CurrencyAmount.fromRawAmount(token, 0),
                    gasCostInUSD: CurrencyAmount.fromRawAmount(usdToken, 0),
                };
            }
            const token0 = nativePool.token0.address == nativeCurrency.address;
            // returns mid price in terms of the native currency (the ratio of quoteToken/nativeToken)
            const nativeTokenPrice = token0
                ? nativePool.token0Price
                : nativePool.token1Price;
            let gasCostInTermsOfQuoteToken;
            try {
                // native token is base currency
                gasCostInTermsOfQuoteToken = nativeTokenPrice.quote(totalGasCostNativeCurrency);
            }
            catch (err) {
                log.info({
                    nativeTokenPriceBase: nativeTokenPrice.baseCurrency,
                    nativeTokenPriceQuote: nativeTokenPrice.quoteCurrency,
                    gasCostInEth: totalGasCostNativeCurrency.currency,
                }, 'Debug eth price token issue');
                throw err;
            }
            // true if token0 is the native currency
            const token0USDPool = usdPool.token0.address == nativeCurrency.address;
            // gets the mid price of the pool in terms of the native token
            const nativeTokenPriceUSDPool = token0USDPool
                ? usdPool.token0Price
                : usdPool.token1Price;
            let gasCostInTermsOfUSD;
            try {
                gasCostInTermsOfUSD = nativeTokenPriceUSDPool.quote(totalGasCostNativeCurrency);
            }
            catch (err) {
                log.info({
                    usdT1: usdPool.token0.symbol,
                    usdT2: usdPool.token1.symbol,
                    gasCostInNativeToken: totalGasCostNativeCurrency.currency.symbol,
                }, 'Failed to compute USD gas price');
                throw err;
            }
            return {
                gasEstimate: baseGasUse,
                gasCostInToken: gasCostInTermsOfQuoteToken,
                gasCostInUSD: gasCostInTermsOfUSD,
            };
        };
        return {
            estimateGasCost: estimateGasCost.bind(this),
            calculateL1GasFees,
        };
    }
    estimateGas(routeWithValidQuote, gasPriceWei, chainId) {
        const totalInitializedTicksCrossed = BigNumber.from(Math.max(1, _.sum(routeWithValidQuote.initializedTicksCrossedList)));
        const totalHops = BigNumber.from(routeWithValidQuote.route.pools.length);
        const hopsGasUse = COST_PER_HOP(chainId).mul(totalHops);
        const tickGasUse = COST_PER_INIT_TICK(chainId).mul(totalInitializedTicksCrossed);
        const uninitializedTickGasUse = COST_PER_UNINIT_TICK.mul(0);
        // base estimate gas used based on chainId estimates for hops and ticks gas useage
        const baseGasUse = BASE_SWAP_COST(chainId)
            .add(hopsGasUse)
            .add(tickGasUse)
            .add(uninitializedTickGasUse);
        const baseGasCostWei = gasPriceWei.mul(baseGasUse);
        const wrappedCurrency = WRAPPED_NATIVE_CURRENCY[chainId];
        const totalGasCostNativeCurrency = CurrencyAmount.fromRawAmount(wrappedCurrency, baseGasCostWei.toString());
        return {
            totalGasCostNativeCurrency,
            totalInitializedTicksCrossed,
            baseGasUse,
        };
    }
    /**
     * To avoid having a call to optimism's L1 security fee contract for every route and amount combination,
     * we replicate the gas cost accounting here.
     */
    calculateOptimismToL1SecurityFee(routes, swapConfig, gasData) {
        const { l1BaseFee, scalar, decimals, overhead } = gasData;
        const route = routes[0];
        const inputToken = route.tradeType == TradeType.EXACT_INPUT
            ? route.amount.currency
            : route.quote.currency;
        const outputToken = route.tradeType == TradeType.EXACT_INPUT
            ? route.quote.currency
            : route.amount.currency;
        // build trade for swap calldata
        const trade = buildTrade(inputToken, outputToken, route.tradeType, routes);
        const data = buildSwapMethodParameters(trade, swapConfig, ChainId.OPTIMISM).calldata;
        const l1GasUsed = getL2ToL1GasUsed(data, overhead);
        // l1BaseFee is L1 Gas Price on etherscan
        const l1Fee = l1GasUsed.mul(l1BaseFee);
        const unscaled = l1Fee.mul(scalar);
        // scaled = unscaled / (10 ** decimals)
        const scaledConversion = BigNumber.from(10).pow(decimals);
        const scaled = unscaled.div(scaledConversion);
        return [l1GasUsed, scaled];
    }
    calculateArbitrumToL1SecurityFee(routes, swapConfig, gasData) {
        const { perL2TxFee, perL1CalldataFee } = gasData;
        const route = routes[0];
        const inputToken = route.tradeType == TradeType.EXACT_INPUT
            ? route.amount.currency
            : route.quote.currency;
        const outputToken = route.tradeType == TradeType.EXACT_INPUT
            ? route.quote.currency
            : route.amount.currency;
        // build trade for swap calldata
        const trade = buildTrade(inputToken, outputToken, route.tradeType, routes);
        const data = buildSwapMethodParameters(trade, swapConfig, ChainId.ARBITRUM_ONE).calldata;
        // calculates gas amounts based on bytes of calldata, use 0 as overhead.
        const l1GasUsed = getL2ToL1GasUsed(data, BigNumber.from(0));
        // multiply by the fee per calldata and add the flat l2 fee
        let l1Fee = l1GasUsed.mul(perL1CalldataFee);
        l1Fee = l1Fee.add(perL2TxFee);
        return [l1GasUsed, l1Fee];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjMtaGV1cmlzdGljLWdhcy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yb3V0ZXJzL2FscGhhLXJvdXRlci9nYXMtbW9kZWxzL3YzL3YzLWhldXJpc3RpYy1nYXMtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdkQsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE9BQU8sRUFFTCxRQUFRLEVBQ1IsdUJBQXVCLEdBQ3hCLE1BQU0sYUFBYSxDQUFDO0FBS3JCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUNMLCtCQUErQixFQUMvQiw0QkFBNEIsRUFDNUIsZ0JBQWdCLEdBQ2pCLE1BQU0sc0NBQXNDLENBQUM7QUFDOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsVUFBVSxHQUNYLE1BQU0sbUNBQW1DLENBQUM7QUFFM0MsT0FBTyxFQUdMLHVCQUF1QixHQUN4QixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQ0wsY0FBYyxFQUNkLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsb0JBQW9CLEdBQ3JCLE1BQU0sYUFBYSxDQUFDO0FBRXJCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sT0FBTywwQkFBMkIsU0FBUSx1QkFBdUI7SUFDckU7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFTSxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQ3pCLE9BQU8sRUFDUCxXQUFXLEVBQ1gsY0FBYyxFQUFF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
import { BigNumber } from '@ethersproject/bignumber';
import { Logger } from '@ethersproject/logger';
import { SwapRouter, Trade } from '@uniswap/router-sdk';
import { TradeType } from '@uniswap/sdk-core';
import { FeeAmount, Route } from '@uniswap/v3-sdk';
import _ from 'lodash';
import { SimulationStatus } from '../../providers';
import { DAI_MAINNET, USDC_MAINNET, } from '../../providers/token-provider';
import { SWAP_ROUTER_02_ADDRESS } from '../../util';
import { CurrencyAmount } from '../../util/amounts';
import { log } from '../../util/log';
import { routeToString } from '../../util/routes';
import { V3RouteWithValidQuote } from '../alpha-router';
import { V3Route } from '../router';
import { ADDITIONAL_BASES, BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES, } from './bases';
// Interface defaults to 2.
const MAX_HOPS = 2;
/**
 * Replicates the router implemented in the V3 interface.
 * Code is mostly a copy from https://github.com/Uniswap/uniswap-interface/blob/0190b5a408c13016c87e1030ffc59326c085f389/src/hooks/useBestV3Trade.ts#L22-L23
 * with React/Redux hooks removed, and refactoring to allow re-use in other routers.
 */
export class LegacyRouter {
    constructor({ chainId, multicall2Provider, poolProvider, quoteProvider, tokenProvider, }) {
        this.chainId = chainId;
        this.multicall2Provider = multicall2Provider;
        this.poolProvider = poolProvider;
        this.quoteProvider = quoteProvider;
        this.tokenProvider = tokenProvider;
    }
    async route(amount, quoteCurrency, swapType, swapConfig, partialRoutingConfig) {
        if (swapType == TradeType.EXACT_INPUT) {
            return this.routeExactIn(amount.currency, quoteCurrency, amount, swapConfig, partialRoutingConfig);
        }
        return this.routeExactOut(quoteCurrency, amount.currency, amount, swapConfig, partialRoutingConfig);
    }
    async routeExactIn(currencyIn, currencyOut, amountIn, swapConfig, routingConfig) {
        const tokenIn = currencyIn.wrapped;
        const tokenOut = currencyOut.wrapped;
        const routes = await this.getAllRoutes(tokenIn, tokenOut, routingConfig);
        const routeQuote = await this.findBestRouteExactIn(amountIn, tokenOut, routes, routingConfig);
        if (!routeQuote) {
            return null;
        }
        const trade = this.buildTrade(currencyIn, currencyOut, TradeType.EXACT_INPUT, routeQuote);
        return {
            quote: routeQuote.quote,
            quoteGasAdjusted: routeQuote.quote,
            route: [routeQuote],
            estimatedGasUsed: BigNumber.from(0),
            estimatedGasUsedQuoteToken: CurrencyAmount.fromFractionalAmount(tokenOut, 0, 1),
            estimatedGasUsedUSD: CurrencyAmount.fromFractionalAmount(DAI_MAINNET, 0, 1),
            gasPriceWei: BigNumber.from(0),
            trade,
            methodParameters: swapConfig
                ? { ...this.buildMethodParameters(trade, swapConfig), to: SWAP_ROUTER_02_ADDRESS }
                : undefined,
            blockNumber: BigNumber.from(0),
            simulationStatus: SimulationStatus.Unattempted
        };
    }
    async routeExactOut(currencyIn, currencyOut, amountOut, swapConfig, routingConfig) {
        const tokenIn = currencyIn.wrapped;
        const tokenOut = currencyOut.wrapped;
        const routes = await this.getAllRoutes(tokenIn, tokenOut, routingConfig);
        const routeQuote = await this.findBestRouteExactOut(amountOut, tokenIn, routes, routingConfig);
        if (!routeQuote) {
            return null;
        }
        const trade = this.buildTrade(currencyIn, currencyOut, TradeType.EXACT_OUTPUT, routeQuote);
        return {
            quote: routeQuote.quote,
            quoteGasAdjusted: routeQuote.quote,
            route: [routeQuote],
            estimatedGasUsed: BigNumber.from(0),
            estimatedGasUsedQuoteToken: CurrencyAmount.fromFractionalAmount(tokenIn, 0, 1),
            estimatedGasUsedUSD: CurrencyAmount.fromFractionalAmount(DAI_MAINNET, 0, 1),
            gasPriceWei: BigNumber.from(0),
            trade,
            methodParameters: swapConfig
                ? { ...this.buildMethodParameters(trade, swapConfig), to: SWAP_ROUTER_02_ADDRESS }
                : undefined,
            blockNumber: BigNumber.from(0),
            simulationStatus: SimulationStatus.Unattempted
        };
    }
    async findBestRouteExactIn(amountIn, tokenOut, routes, routingConfig) {
        const { routesWithQuotes: quotesRaw } = await this.quoteProvider.getQuotesManyExactIn([amountIn], routes, {
            blockNumber: routingConfig === null || routingConfig === void 0 ? void 0 : routingConfig.blockNumber,
        });
        const quotes100Percent = _.map(quotesRaw, ([route, quotes]) => { var _a, _b; return `${routeToString(route)} : ${(_b = (_a = quotes[0]) === null || _a === void 0 ? void 0 : _a.quote) === null || _b === void 0 ? void 0 : _b.toString()}`; });
        log.info({ quotes100Percent }, '100% Quotes');
        const bestQuote = await this.getBestQuote(routes, quotesRaw, tokenOut, TradeType.EXACT_INPUT);
        return bestQuote;
    }
    async findBestRouteExactOut(amountOut, tokenIn, routes, routingConfig) {
        const { routesWithQuotes: quotesRaw } = await this.quoteProvider.getQuotesManyExactOut([amountOut], routes, {
            blockNumber: routingConfig === null || routingConfig === void 0 ? void 0 : routingConfig.blockNumber,
        });
        const bestQuote = await this.getBestQuote(routes, quotesRaw, tokenIn, TradeType.EXACT_OUTPUT);
        return bestQuote;
    }
    async getBestQuote(routes, quotesRaw, quoteToken, routeType) {
        log.debug(`Got ${_.filter(quotesRaw, ([_, quotes]) => !!quotes[0]).length} valid quotes from ${routes.length} possible routes.`);
        const routeQuotesRaw = [];
        for (let i = 0; i < quotesRaw.length; i++) {
            const [route, quotes] = quotesRaw[i];
            const { quote, amount } = quotes[0];
            if (!quote) {
                Logger.globalLogger().debug(`No quote for ${routeToString(route)}`);
                continue;
            }
            routeQuotesRaw.push({ route, quote, amount });
        }
        if (routeQuotesRaw.length == 0) {
            return null;
        }
        routeQuotesRaw.sort((routeQuoteA, routeQuoteB) => {
            if (routeType == TradeType.EXACT_INPUT) {
                return routeQuoteA.quote.gt(routeQuoteB.quote) ? -1 : 1;
            }
            else {
                return routeQuoteA.quote.lt(routeQuoteB.quote) ? -1 : 1;
            }
        });
        const routeQuotes = _.map(routeQuotesRaw, ({ route, quote, amount }) => {
            return new V3RouteWithValidQuote({
                route,
                rawQuote: quote,
                amount,
                percent: 100,
                gasModel: {
                    estimateGasCost: () => ({
                        gasCostInToken: CurrencyAmount.fromRawAmount(quoteToken, 0),
                        gasCostInUSD: CurrencyAmount.fromRawAmount(USDC_MAINNET, 0),
                        gasEstimate: BigNumber.from(0),
                    }),
                },
                sqrtPriceX96AfterList: [],
                initializedTicksCrossedList: [],
                quoterGasEstimate: BigNumber.from(0),
                tradeType: routeType,
                quoteToken,
                v3PoolProvider: this.poolProvider,
            });
        });
        for (const rq of routeQuotes) {
            log.debug(`Quote: ${rq.amount.toFixed(Math.min(rq.amount.currency.decimals, 2))} Route: ${routeToString(rq.route)}`);
        }
        return routeQuotes[0];
    }
    async getAllRoutes(tokenIn, tokenOut, routingConfig) {
        const tokenPairs = await this.getAllPossiblePairings(tokenIn, tokenOut);
        const poolAccessor = await this.poolProvider.getPools(tokenPairs, {
            blockNumber: routingConfig === null || routingConfig === void 0 ? void 0 : routingConfig.blockNumber,
        });
        const pools = poolAccessor.getAllPools();
        const routes = this.computeAllRoutes(tokenIn, tokenOut, pools, this.chainId, [], [], tokenIn, MAX_HOPS);
        log.info({ routes: _.map(routes, routeToString) }, `Computed ${routes.length} possible routes.`);
        return routes;
    }
    async getAllPossiblePairings(tokenIn, tokenOut) {
        var _a, _b, _c, _d, _e;
        const common = (_a = BASES_TO_CHECK_TRADES_AGAINST(this.tokenProvider)[this.chainId]) !== null && _a !== void 0 ? _a : [];
        const additionalA = (_c = (_b = (await ADDITIONAL_BASES(this.tokenProvider))[this.chainId]) === null || _b === void 0 ? void 0 : _b[tokenIn.address]) !== null && _c !== void 0 ? _c : [];
        const additionalB = (_e = (_d = (await ADDITIONAL_BASES(this.tokenProvider))[this.chainId]) === null || _d === void 0 ? void 0 : _d[tokenOut.address]) !== null && _e !== void 0 ? _e : [];
        const bases = [...common, ...additionalA, ...additionalB];
        const basePairs = _.flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase]));
        const customBases = (await CUSTOM_BASES(this.tokenProvider))[this.chainId];
        const allPairs = _([
            // the direct pair
            [tokenIn, tokenOut],
            // token A against all bases
            ...bases.map((base) => [tokenIn, base]),
            // token B against all bases
            ...bases.map((base) => [tokenOut, base]),
            // each base against all bases
            ...basePairs,
        ])
            .filter((tokens) => Boolean(tokens[0] && tokens[1]))
            .filter(([tokenA, tokenB]) => tokenA.address !== tokenB.address && !tokenA.equals(tokenB))
            .filter(([tokenA, tokenB]) => {
            const customBasesA = customBases === null || customBases === void 0 ? void 0 : customBases[tokenA.address];
            const customBasesB = customBases === null || customBases === void 0 ? void 0 : customBases[tokenB.address];
            if (!customBasesA && !customBasesB)
                return true;
            if (customBasesA && !customBasesA.find((base) => tokenB.equals(base)))
                return false;
            if (customBasesB && !customBasesB.find((base) => tokenA.equals(base)))
                return false;
            return true;
        })
            .flatMap(([tokenA, tokenB]) => {
            return [
                [tokenA, tokenB, FeeAmount.LOW],
                [tokenA, tokenB, FeeAmount.MEDIUM],
                [tokenA, tokenB, FeeAmount.HIGH],
            ];
        })
            .value();
        return allPairs;
    }
    computeAllRoutes(tokenIn, tokenOut, pools, chainId, currentPath = [], allPaths = [], startTokenIn = tokenIn, maxHops = 2) {
        for (const pool of pools) {
            if (currentPath.indexOf(pool) !== -1 || !pool.involvesToken(tokenIn))
                continue;
            const outputToken = pool.token0.equals(tokenIn)
                ? pool.token1
                : pool.token0;
            if (outputToken.equals(tokenOut)) {
                allPaths.push(new V3Route([...currentPath, pool], startTokenIn, tokenOut));
            }
            else if (maxHops > 1) {
                this.computeAllRoutes(outputToken, tokenOut, pools, chainId, [...currentPath, pool], allPaths, startTokenIn, maxHops - 1);
            }
        }
        return allPaths;
    }
    buildTrade(tokenInCurrency, tokenOutCurrency, tradeType, routeAmount) {
        const { route, amount, quote } = routeAmount;
        // The route, amount and quote are all in terms of wrapped tokens.
        // When constructing the Trade object the inputAmount/outputAmount must
        // use native currencies if necessary. This is so that the Trade knows to wrap/unwrap.
        if (tradeType == TradeType.EXACT_INPUT) {
            const amountCurrency = CurrencyAmount.fromFractionalAmount(tokenInCurrency, amount.numerator, amount.denominator);
            const quoteCurrency = CurrencyAmount.fromFractionalAmount(tokenOutCurrency, quote.numerator, quote.denominator);
            const routeCurrency = new Route(route.pools, amountCurrency.currency, quoteCurrency.currency);
            return new Trade({
                v3Routes: [
                    {
                        routev3: routeCurrency,
                        inputAmount: amountCurrency,
                        outputAmount: quoteCurrency,
                    },
                ],
                v2Routes: [],
                tradeType: tradeType,
            });
        }
        else {
            const quoteCurrency = CurrencyAmount.fromFractionalAmount(tokenInCurrency, quote.numerator, quote.denominator);
            const amountCurrency = CurrencyAmount.fromFractionalAmount(tokenOutCurrency, amount.numerator, amount.denominator);
            const routeCurrency = new Route(route.pools, quoteCurrency.currency, amountCurrency.currency);
            return new Trade({
                v3Routes: [
                    {
                        routev3: routeCurrency,
                        inputAmount: quoteCurrency,
                        outputAmount: amountCurrency,
                    },
                ],
                v2Routes: [],
                tradeType: tradeType,
            });
        }
    }
    buildMethodParameters(trade, swapConfig) {
        const { recipient, slippageTolerance, deadline } = swapConfig;
        const methodParameters = SwapRouter.swapCallParameters(trade, {
            recipient,
            slippageTolerance,
            deadlineOrPreviousBlockhash: deadline,
            // ...(signatureData
            //   ? {
            //       inputTokenPermit:
            //         'allowed' in signatureData
            //           ? {
            //               expiry: signatureData.deadline,
            //               nonce: signatureData.nonce,
            //               s: signatureData.s,
            //               r: signatureData.r,
            //               v: signatureData.v as any,
            //             }
            //           : {
            //               deadline: signatureData.deadline,
            //               amount: signatureData.amount,
            //               s: signatureData.s,
            //               r: signatureData.r,
            //               v: signatureData.v as any,
            //             },
            //     }
            //   : {}),
        });
        return methodParameters;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LXJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yb3V0ZXJzL2xlZ2FjeS1yb3V0ZXIvbGVnYWN5LXJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFtQixTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUEwQixLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUEwQyxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzNGLE9BQU8sRUFDTCxXQUFXLEVBRVgsWUFBWSxHQUNiLE1BQU0sZ0NBQWdDLENBQUM7QUFFeEMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBc0MsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXhFLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsNkJBQTZCLEVBQzdCLFlBQVksR0FDYixNQUFNLFNBQVMsQ0FBQztBQVVqQiwyQkFBMkI7QUFDM0IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBTW5COzs7O0dBSUc7QUFD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
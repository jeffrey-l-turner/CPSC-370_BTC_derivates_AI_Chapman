import { JsonRpcProvider } from '@ethersproject/providers';
import { TradeType } from '@uniswap/sdk-core';
import { SwapOptions, SwapRoute } from '../routers';
import { ChainId, CurrencyAmount } from '../util';
import { ProviderConfig } from './provider';
import { ArbitrumGasData, OptimismGasData } from './v3/gas-data-provider';
export declare type SimulationResult = {
    transaction: {
        hash: string;
        gas_used: number;
        error_message: string;
    };
    simulation: {
        state_overrides: Record<string, unknown>;
    };
};
export declare enum SimulationStatus {
    Unattempted = 0,
    Failed = 1,
    Succeeded = 2
}
/**
 * Provider for dry running transactions.
 *
 * @export
 * @class Simulator
 */
export declare abstract class Simulator {
    protected chainId: ChainId;
    protected provider: JsonRpcProvider;
    /**
     * Returns a new SwapRoute with simulated gas estimates
     * @returns SwapRoute
     */
    constructor(provider: JsonRpcProvider, chainId: ChainId);
    simulate(fromAddress: string, swapOptions: SwapOptions, swapRoute: SwapRoute, amount: CurrencyAmount, quote: CurrencyAmount, l2GasData?: OptimismGasData | ArbitrumGasData, providerConfig?: ProviderConfig): Promise<SwapRoute>;
    protected abstract simulateTransaction(fromAddress: string, swapOptions: SwapOptions, swapRoute: SwapRoute, l2GasData?: OptimismGasData | ArbitrumGasData, providerConfig?: ProviderConfig): Promise<SwapRoute>;
    protected userHasSufficientBalance(fromAddress: string, tradeType: TradeType, amount: CurrencyAmount, quote: CurrencyAmount): Promise<boolean>;
    protected checkTokenApproved(fromAddress: string, inputAmount: CurrencyAmount, swapOptions: SwapOptions, provider: JsonRpcProvider): Promise<boolean>;
}

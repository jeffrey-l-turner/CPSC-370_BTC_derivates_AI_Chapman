import { JsonRpcProvider } from '@ethersproject/providers';
import { SwapOptions, SwapRoute } from '../routers';
import { ChainId } from '../util';
import { ProviderConfig } from './provider';
import { SimulationResult, Simulator } from './simulation-provider';
import { IV2PoolProvider } from './v2/pool-provider';
import { ArbitrumGasData, OptimismGasData } from './v3/gas-data-provider';
import { IV3PoolProvider } from './v3/pool-provider';
export declare type TenderlyResponseUniversalRouter = {
    config: {
        url: string;
        method: string;
        data: string;
    };
    simulation_results: [SimulationResult, SimulationResult, SimulationResult];
};
export declare type TenderlyResponseSwapRouter02 = {
    config: {
        url: string;
        method: string;
        data: string;
    };
    simulation_results: [SimulationResult, SimulationResult];
};
export declare class FallbackTenderlySimulator extends Simulator {
    private tenderlySimulator;
    private v3PoolProvider;
    private v2PoolProvider;
    constructor(chainId: ChainId, tenderlyBaseUrl: string, tenderlyUser: string, tenderlyProject: string, tenderlyAccessKey: string, provider: JsonRpcProvider, v2PoolProvider: IV2PoolProvider, v3PoolProvider: IV3PoolProvider, tenderlySimulator?: TenderlySimulator);
    protected simulateTransaction(fromAddress: string, swapOptions: SwapOptions, swapRoute: SwapRoute, l2GasData?: ArbitrumGasData | OptimismGasData, providerConfig?: ProviderConfig): Promise<SwapRoute>;
    private ethEstimateGas;
}
export declare class TenderlySimulator extends Simulator {
    private tenderlyBaseUrl;
    private tenderlyUser;
    private tenderlyProject;
    private tenderlyAccessKey;
    private v2PoolProvider;
    private v3PoolProvider;
    constructor(chainId: ChainId, tenderlyBaseUrl: string, tenderlyUser: string, tenderlyProject: string, tenderlyAccessKey: string, v2PoolProvider: IV2PoolProvider, v3PoolProvider: IV3PoolProvider, provider: JsonRpcProvider);
    simulateTransaction(fromAddress: string, swapOptions: SwapOptions, swapRoute: SwapRoute, l2GasData?: ArbitrumGasData | OptimismGasData, providerConfig?: ProviderConfig): Promise<SwapRoute>;
    private logTenderlyErrorResponse;
}

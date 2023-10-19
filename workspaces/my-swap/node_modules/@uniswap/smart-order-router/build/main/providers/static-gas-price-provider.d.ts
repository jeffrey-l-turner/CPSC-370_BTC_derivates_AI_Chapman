import { BigNumber } from 'ethers';
import { GasPrice, IGasPriceProvider } from './gas-price-provider';
export declare class StaticGasPriceProvider implements IGasPriceProvider {
    private gasPriceWei;
    constructor(gasPriceWei: BigNumber);
    getGasPrice(): Promise<GasPrice>;
}

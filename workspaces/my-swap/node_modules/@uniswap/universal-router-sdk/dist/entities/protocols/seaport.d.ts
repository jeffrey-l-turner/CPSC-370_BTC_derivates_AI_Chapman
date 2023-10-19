import { BigNumber, BigNumberish } from 'ethers';
import { Interface } from '@ethersproject/abi';
import { BuyItem, NFTTrade } from '../NFTTrade';
import { TradeConfig } from '../Command';
import { RoutePlanner } from '../../utils/routerCommands';
export declare type SeaportData = {
    items: Order[];
    recipient: string;
};
export declare type FulfillmentComponent = {
    orderIndex: BigNumberish;
    itemIndex: BigNumberish;
};
export declare type OfferItem = {
    itemType: BigNumberish;
    token: string;
    identifierOrCriteria: BigNumberish;
    startAmount: BigNumberish;
    endAmount: BigNumberish;
};
export declare type ConsiderationItem = OfferItem & {
    recipient: string;
};
export declare type Order = {
    parameters: OrderParameters;
    signature: string;
};
declare type OrderParameters = {
    offerer: string;
    offer: OfferItem[];
    consideration: ConsiderationItem[];
    orderType: BigNumberish;
    startTime: BigNumberish;
    endTime: BigNumberish;
    zoneHash: string;
    zone: string;
    salt: BigNumberish;
    conduitKey: string;
    totalOriginalConsiderationItems: BigNumberish;
};
export declare type AdvancedOrder = Order & {
    numerator: BigNumber;
    denominator: BigNumber;
    extraData: string;
};
export declare class SeaportTrade extends NFTTrade<SeaportData> {
    static INTERFACE: Interface;
    static OPENSEA_CONDUIT_KEY: string;
    constructor(orders: SeaportData[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
    private getConsiderationFulfillments;
    private getAdvancedOrderParams;
    private calculateValue;
}
export {};

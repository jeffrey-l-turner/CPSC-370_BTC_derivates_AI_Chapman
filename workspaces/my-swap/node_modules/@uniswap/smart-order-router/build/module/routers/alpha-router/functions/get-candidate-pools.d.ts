import { Protocol } from '@uniswap/router-sdk';
import { Token, TradeType } from '@uniswap/sdk-core';
import { ITokenListProvider, IV2SubgraphProvider, V2SubgraphPool } from '../../../providers';
import { ITokenProvider } from '../../../providers/token-provider';
import { IV2PoolProvider, V2PoolAccessor } from '../../../providers/v2/pool-provider';
import { IV3PoolProvider, V3PoolAccessor } from '../../../providers/v3/pool-provider';
import { IV3SubgraphProvider, V3SubgraphPool } from '../../../providers/v3/subgraph-provider';
import { ChainId } from '../../../util';
import { AlphaRouterConfig } from '../alpha-router';
export declare type PoolId = {
    id: string;
};
export declare type CandidatePoolsBySelectionCriteria = {
    protocol: Protocol;
    selections: CandidatePoolsSelections;
};
export declare type CandidatePoolsSelections = {
    topByBaseWithTokenIn: PoolId[];
    topByBaseWithTokenOut: PoolId[];
    topByDirectSwapPool: PoolId[];
    topByEthQuoteTokenPool: PoolId[];
    topByTVL: PoolId[];
    topByTVLUsingTokenIn: PoolId[];
    topByTVLUsingTokenOut: PoolId[];
    topByTVLUsingTokenInSecondHops: PoolId[];
    topByTVLUsingTokenOutSecondHops: PoolId[];
};
export declare type V3GetCandidatePoolsParams = {
    tokenIn: Token;
    tokenOut: Token;
    routeType: TradeType;
    routingConfig: AlphaRouterConfig;
    subgraphProvider: IV3SubgraphProvider;
    tokenProvider: ITokenProvider;
    poolProvider: IV3PoolProvider;
    blockedTokenListProvider?: ITokenListProvider;
    chainId: ChainId;
};
export declare type V2GetCandidatePoolsParams = {
    tokenIn: Token;
    tokenOut: Token;
    routeType: TradeType;
    routingConfig: AlphaRouterConfig;
    subgraphProvider: IV2SubgraphProvider;
    tokenProvider: ITokenProvider;
    poolProvider: IV2PoolProvider;
    blockedTokenListProvider?: ITokenListProvider;
    chainId: ChainId;
};
export declare type MixedRouteGetCandidatePoolsParams = {
    tokenIn: Token;
    tokenOut: Token;
    routeType: TradeType;
    routingConfig: AlphaRouterConfig;
    v2subgraphProvider: IV2SubgraphProvider;
    v3subgraphProvider: IV3SubgraphProvider;
    tokenProvider: ITokenProvider;
    v2poolProvider: IV2PoolProvider;
    v3poolProvider: IV3PoolProvider;
    blockedTokenListProvider?: ITokenListProvider;
    chainId: ChainId;
};
export declare function getV3CandidatePools({ tokenIn, tokenOut, routeType, routingConfig, subgraphProvider, tokenProvider, poolProvider, blockedTokenListProvider, chainId, }: V3GetCandidatePoolsParams): Promise<{
    poolAccessor: V3PoolAccessor;
    candidatePools: CandidatePoolsBySelectionCriteria;
    subgraphPools: V3SubgraphPool[];
}>;
export declare function getV2CandidatePools({ tokenIn, tokenOut, routeType, routingConfig, subgraphProvider, tokenProvider, poolProvider, blockedTokenListProvider, chainId, }: V2GetCandidatePoolsParams): Promise<{
    poolAccessor: V2PoolAccessor;
    candidatePools: CandidatePoolsBySelectionCriteria;
    subgraphPools: V2SubgraphPool[];
}>;
export declare function getMixedRouteCandidatePools({ tokenIn, tokenOut, routeType, routingConfig, v3subgraphProvider, v2subgraphProvider, tokenProvider, v3poolProvider, v2poolProvider, blockedTokenListProvider, chainId, }: MixedRouteGetCandidatePoolsParams): Promise<{
    V2poolAccessor: V2PoolAccessor;
    V3poolAccessor: V3PoolAccessor;
    candidatePools: CandidatePoolsBySelectionCriteria;
    subgraphPools: (V2SubgraphPool | V3SubgraphPool)[];
}>;

import _ from 'lodash';
import { log } from '../../util/log';
/**
 * Provider for getting V2 pools, with functionality for caching the results per block.
 *
 * @export
 * @class CachingV2PoolProvider
 */
export class CachingV2PoolProvider {
    /**
     * Creates an instance of CachingV3PoolProvider.
     * @param chainId The chain id to use.
     * @param poolProvider The provider to use to get the pools when not in the cache.
     * @param cache Cache instance to hold cached pools.
     */
    constructor(chainId, poolProvider, 
    // Cache is block aware. For V2 pools we need to use the current blocks reserves values since
    // we compute quotes off-chain.
    // If no block is specified in the call to getPools we just return whatever is in the cache.
    cache) {
        this.chainId = chainId;
        this.poolProvider = poolProvider;
        this.cache = cache;
        this.POOL_KEY = (chainId, address) => `pool-${chainId}-${address}`;
    }
    async getPools(tokenPairs, providerConfig) {
        const poolAddressSet = new Set();
        const poolsToGetTokenPairs = [];
        const poolsToGetAddresses = [];
        const poolAddressToPool = {};
        const blockNumber = await (providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber);
        for (const [tokenA, tokenB] of tokenPairs) {
            const { poolAddress, token0, token1 } = this.getPoolAddress(tokenA, tokenB);
            if (poolAddressSet.has(poolAddress)) {
                continue;
            }
            poolAddressSet.add(poolAddress);
            const cachedPool = await this.cache.get(this.POOL_KEY(this.chainId, poolAddress));
            if (cachedPool) {
                // If a block was specified by the caller, ensure that the result in our cache matches the
                // expected block number. If a block number is not specified, just return whatever is in the
                // cache.
                if (!blockNumber || (blockNumber && cachedPool.block == blockNumber)) {
                    poolAddressToPool[poolAddress] = cachedPool.pair;
                    continue;
                }
            }
            poolsToGetTokenPairs.push([token0, token1]);
            poolsToGetAddresses.push(poolAddress);
        }
        log.info({
            poolsFound: _.map(Object.values(poolAddressToPool), (p) => p.token0.symbol + ' ' + p.token1.symbol),
            poolsToGetTokenPairs: _.map(poolsToGetTokenPairs, (t) => t[0].symbol + ' ' + t[1].symbol),
        }, `Found ${Object.keys(poolAddressToPool).length} V2 pools already in local cache for block ${blockNumber}. About to get reserves for ${poolsToGetTokenPairs.length} pools.`);
        if (poolsToGetAddresses.length > 0) {
            const poolAccessor = await this.poolProvider.getPools(poolsToGetTokenPairs, providerConfig);
            for (const address of poolsToGetAddresses) {
                const pool = poolAccessor.getPoolByAddress(address);
                if (pool) {
                    poolAddressToPool[address] = pool;
                    await this.cache.set(this.POOL_KEY(this.chainId, address), {
                        pair: pool,
                        block: blockNumber,
                    });
                }
            }
        }
        return {
            getPool: (tokenA, tokenB) => {
                const { poolAddress } = this.getPoolAddress(tokenA, tokenB);
                return poolAddressToPool[poolAddress];
            },
            getPoolByAddress: (address) => poolAddressToPool[address],
            getAllPools: () => Object.values(poolAddressToPool),
        };
    }
    getPoolAddress(tokenA, tokenB) {
        return this.poolProvider.getPoolAddress(tokenA, tokenB);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGluZy1wb29sLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy92Mi9jYWNoaW5nLXBvb2wtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU1yQzs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxxQkFBcUI7SUFJaEM7Ozs7O09BS0c7SUFDSCxZQUNZLE9BQWdCLEVBQ2hCLFlBQTZCO0lBQ3ZDLDZGQUE2RjtJQUM3RiwrQkFBK0I7SUFDL0IsNEZBQTRGO0lBQ3BGLEtBQTZDO1FBTDNDLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBSS9CLFVBQUssR0FBTCxLQUFLLENBQXdDO1FBZi9DLGFBQVEsR0FBRyxDQUFDLE9BQWdCLEVBQUUsT0FBZSxFQUFFLEVBQUUsQ0FDdkQsUUFBUSxPQUFPLElBQUksT0FBTyxFQUFFLENBQUM7SUFlNUIsQ0FBQztJQUVHLEtBQUssQ0FBQyxRQUFRLENBQ25CLFVBQTRCLEVBQzVCLGNBQStCO1FBRS9CLE1BQU0sY0FBYyxHQUFnQixJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ3RELE1BQU0sb0JBQW9CLEdBQTBCLEVBQUUsQ0FBQztRQUN2RCxNQUFNLG1CQUFtQixHQUFhLEVBQUUsQ0FBQztRQUN6QyxNQUFNLGlCQUFpQixHQUFvQyxFQUFFLENBQUM7UUFFOUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxXQUFXLENBQUEsQ0FBQztRQUV0RCxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksVUFBVSxFQUFFO1lBQ3pDLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxH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
import { Token } from '@uniswap/sdk-core';
import axios from 'axios';
import _ from 'lodash';
import { log } from '../util/log';
import { metric, MetricLoggerUnit } from '../util/metric';
export class CachingTokenListProvider {
    /**
     * Creates an instance of CachingTokenListProvider.
     * Token metadata (e.g. symbol and decimals) generally don't change so can be cached indefinitely.
     *
     * @param chainId The chain id to use.
     * @param tokenList The token list to get the tokens from.
     * @param tokenCache Cache instance to hold cached tokens.
     */
    constructor(chainId, tokenList, tokenCache) {
        this.tokenCache = tokenCache;
        this.CACHE_KEY = (tokenInfo) => `token-list-token-${this.chainId}/${this.tokenList.name}/${this.tokenList.timestamp}/${this.tokenList.version}/${tokenInfo.address.toLowerCase()}/${tokenInfo.decimals}/${tokenInfo.symbol}/${tokenInfo.name}`;
        this.chainId = chainId;
        this.tokenList = tokenList;
        this.chainToTokenInfos = _.reduce(this.tokenList.tokens, (result, tokenInfo) => {
            const chainId = tokenInfo.chainId.toString();
            if (!result[chainId]) {
                result[chainId] = [];
            }
            result[chainId].push(tokenInfo);
            return result;
        }, {});
        this.chainSymbolToTokenInfo = _.mapValues(this.chainToTokenInfos, (tokenInfos) => _.keyBy(tokenInfos, 'symbol'));
        this.chainAddressToTokenInfo = _.mapValues(this.chainToTokenInfos, (tokenInfos) => _.keyBy(tokenInfos, (tokenInfo) => tokenInfo.address.toLowerCase()));
    }
    static async fromTokenListURI(chainId, tokenListURI, tokenCache) {
        const now = Date.now();
        const tokenList = await this.buildTokenList(tokenListURI);
        metric.putMetric('TokenListLoad', Date.now() - now, MetricLoggerUnit.Milliseconds);
        return new CachingTokenListProvider(chainId, tokenList, tokenCache);
    }
    static async buildTokenList(tokenListURI) {
        log.info(`Getting tokenList from ${tokenListURI}.`);
        const response = await axios.get(tokenListURI);
        log.info(`Got tokenList from ${tokenListURI}.`);
        const { data: tokenList, status } = response;
        if (status != 200) {
            log.error({ response }, `Unabled to get token list from ${tokenListURI}.`);
            throw new Error(`Unable to get token list from ${tokenListURI}`);
        }
        return tokenList;
    }
    static async fromTokenList(chainId, tokenList, tokenCache) {
        const now = Date.now();
        const tokenProvider = new CachingTokenListProvider(chainId, tokenList, tokenCache);
        metric.putMetric('TokenListLoad', Date.now() - now, MetricLoggerUnit.Milliseconds);
        return tokenProvider;
    }
    async getTokens(_addresses) {
        const addressToToken = {};
        const symbolToToken = {};
        for (const address of _addresses) {
            const token = await this.getTokenByAddress(address);
            if (!token) {
                continue;
            }
            addressToToken[address.toLowerCase()] = token;
            if (!token.symbol) {
                continue;
            }
            symbolToToken[token.symbol.toLowerCase()] = token;
        }
        return {
            getTokenByAddress: (address) => addressToToken[address.toLowerCase()],
            getTokenBySymbol: (symbol) => symbolToToken[symbol.toLowerCase()],
            getAllTokens: () => {
                return Object.values(addressToToken);
            },
        };
    }
    async getTokenBySymbol(_symbol) {
        let symbol = _symbol;
        // We consider ETH as a regular ERC20 Token throughout this package. We don't use the NativeCurrency object from the sdk.
        // When we build the calldata for swapping we insert wrapping/unwrapping as needed.
        if (_symbol == 'ETH') {
            symbol = 'WETH';
        }
        if (!this.chainSymbolToTokenInfo[this.chainId.toString()]) {
            return undefined;
        }
        const tokenInfo = this.chainSymbolToTokenInfo[this.chainId.toString()][symbol];
        if (!tokenInfo) {
            return undefined;
        }
        const token = await this.buildToken(tokenInfo);
        return token;
    }
    async getTokenByAddress(address) {
        if (!this.chainAddressToTokenInfo[this.chainId.toString()]) {
            return undefined;
        }
        const tokenInfo = this.chainAddressToTokenInfo[this.chainId.toString()][address.toLowerCase()];
        if (!tokenInfo) {
            return undefined;
        }
        const token = await this.buildToken(tokenInfo);
        return token;
    }
    async buildToken(tokenInfo) {
        const cacheKey = this.CACHE_KEY(tokenInfo);
        const cachedToken = await this.tokenCache.get(cacheKey);
        if (cachedToken) {
            return cachedToken;
        }
        const token = new Token(this.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name);
        await this.tokenCache.set(cacheKey, token);
        return token;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGluZy10b2tlbi1saXN0LXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9jYWNoaW5nLXRva2VuLWxpc3QtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFHdkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFzQjFELE1BQU0sT0FBTyx3QkFBd0I7SUFnQm5DOzs7Ozs7O09BT0c7SUFDSCxZQUNFLE9BQXlCLEVBQ3pCLFNBQW9CLEVBQ1osVUFBeUI7UUFBekIsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQXhCM0IsY0FBUyxHQUFHLENBQUMsU0FBb0IsRUFBRSxFQUFFLENBQzNDLG9CQUFvQixJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFDM0QsU0FBUyxDQUFDLFFBQ1osSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQXFCekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUNyQixDQUFDLE1BQTRCLEVBQUUs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
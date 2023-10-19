import _ from 'lodash';
import { ITokenValidator__factory } from '../types/other/factories/ITokenValidator__factory';
import { log, WRAPPED_NATIVE_CURRENCY } from '../util';
const DEFAULT_ALLOWLIST = new Set([
    // RYOSHI. Does not allow transfers between contracts so fails validation.
    '0x777E2ae845272a2F540ebf6a3D03734A5a8f618e'.toLowerCase(),
]);
export var TokenValidationResult;
(function (TokenValidationResult) {
    TokenValidationResult[TokenValidationResult["UNKN"] = 0] = "UNKN";
    TokenValidationResult[TokenValidationResult["FOT"] = 1] = "FOT";
    TokenValidationResult[TokenValidationResult["STF"] = 2] = "STF";
})(TokenValidationResult || (TokenValidationResult = {}));
const TOKEN_VALIDATOR_ADDRESS = '0xb5ee1690b7dcc7859771148d0889be838fe108e0';
const AMOUNT_TO_FLASH_BORROW = '1000';
const GAS_LIMIT_PER_VALIDATE = 1000000;
export class TokenValidatorProvider {
    constructor(chainId, multicall2Provider, tokenValidationCache, tokenValidatorAddress = TOKEN_VALIDATOR_ADDRESS, gasLimitPerCall = GAS_LIMIT_PER_VALIDATE, amountToFlashBorrow = AMOUNT_TO_FLASH_BORROW, allowList = DEFAULT_ALLOWLIST) {
        this.chainId = chainId;
        this.multicall2Provider = multicall2Provider;
        this.tokenValidationCache = tokenValidationCache;
        this.tokenValidatorAddress = tokenValidatorAddress;
        this.gasLimitPerCall = gasLimitPerCall;
        this.amountToFlashBorrow = amountToFlashBorrow;
        this.allowList = allowList;
        this.CACHE_KEY = (chainId, address) => `token-${chainId}-${address}`;
        this.BASES = [WRAPPED_NATIVE_CURRENCY[this.chainId].address];
    }
    async validateTokens(tokens, providerConfig) {
        const tokenAddressToToken = _.keyBy(tokens, 'address');
        const addressesRaw = _(tokens)
            .map((token) => token.address)
            .uniq()
            .value();
        const addresses = [];
        const tokenToResult = {};
        // Check if we have cached token validation results for any tokens.
        for (const address of addressesRaw) {
            if (await this.tokenValidationCache.has(this.CACHE_KEY(this.chainId, address))) {
                tokenToResult[address.toLowerCase()] =
                    (await this.tokenValidationCache.get(this.CACHE_KEY(this.chainId, address)));
            }
            else {
                addresses.push(address);
            }
        }
        log.info(`Got token validation results for ${addressesRaw.length - addresses.length} tokens from cache. Getting ${addresses.length} on-chain.`);
        const functionParams = _(addresses)
            .map((address) => [address, this.BASES, this.amountToFlashBorrow])
            .value();
        // We use the validate function instead of batchValidate to avoid poison pill problem.
        // One token that consumes too much gas could cause the entire batch to fail.
        const multicallResult = await this.multicall2Provider.callSameFunctionOnContractWithMultipleParams({
            address: this.tokenValidatorAddress,
            contractInterface: ITokenValidator__factory.createInterface(),
            functionName: 'validate',
            functionParams: functionParams,
            providerConfig,
            additionalConfig: {
                gasLimitPerCallOverride: this.gasLimitPerCall,
            },
        });
        for (let i = 0; i < multicallResult.results.length; i++) {
            const resultWrapper = multicallResult.results[i];
            const tokenAddress = addresses[i];
            const token = tokenAddressToToken[tokenAddress];
            if (this.allowList.has(token.address.toLowerCase())) {
                tokenToResult[token.address.toLowerCase()] = TokenValidationResult.UNKN;
                await this.tokenValidationCache.set(this.CACHE_KEY(this.chainId, token.address.toLowerCase()), tokenToResult[token.address.toLowerCase()]);
                continue;
            }
            // Could happen if the tokens transfer consumes too much gas so we revert. Just
            // drop the token in that case.
            if (!resultWrapper.success) {
                log.info({ result: resultWrapper }, `Failed to validate token ${token.symbol}`);
                continue;
            }
            const validationResult = resultWrapper.result[0];
            tokenToResult[token.address.toLowerCase()] =
                validationResult;
            await this.tokenValidationCache.set(this.CACHE_KEY(this.chainId, token.address.toLowerCase()), tokenToResult[token.address.toLowerCase()]);
        }
        return {
            getValidationByToken: (token) => tokenToResult[token.address.toLowerCase()],
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4tdmFsaWRhdG9yLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy90b2tlbi12YWxpZGF0b3ItcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdGLE9BQU8sRUFBVyxHQUFHLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFNaEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FBUztJQUN4QywwRUFBMEU7SUFDMUUsNENBQTRDLENBQUMsV0FBVyxFQUFFO0NBQzNELENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBTixJQUFZLHFCQUlYO0FBSkQsV0FBWSxxQkFBcUI7SUFDL0IsaUVBQVEsQ0FBQTtJQUNSLCtEQUFPLENBQUE7SUFDUCwrREFBTyxDQUFBO0FBQ1QsQ0FBQyxFQUpXLHFCQUFxQixLQUFyQixxQkFBcUIsUUFJaEM7QUFNRCxNQUFNLHVCQUF1QixHQUFHLDRDQUE0QyxDQUFDO0FBQzdFLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDO0FBQ3RDLE1BQU0sc0JBQXNCLEdBQUcsT0FBUyxDQUFDO0FBc0J6QyxNQUFNLE9BQU8sc0JBQXNCO0lBTWpDLFlBQ1ksT0FBZ0IsRUFDaEIsa0JBQXNDLEVBQ3hDLG9CQUFtRCxFQUNuRCx3QkFBd0IsdUJBQXVCLEVBQy9DLGtCQUFrQixzQkFBc0IsRUFDeEMsc0JBQXNCLHNCQUFzQixFQUM1QyxZQUFZLGlCQUFpQjtRQU4zQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUErQjtRQUNuRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQTBCO1FBQy9DLG9CQUFlLEdBQWYsZUFBZSxD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
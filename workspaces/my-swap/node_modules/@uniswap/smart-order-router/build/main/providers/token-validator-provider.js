"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidatorProvider = exports.TokenValidationResult = void 0;
const lodash_1 = __importDefault(require("lodash"));
const ITokenValidator__factory_1 = require("../types/other/factories/ITokenValidator__factory");
const util_1 = require("../util");
const DEFAULT_ALLOWLIST = new Set([
    // RYOSHI. Does not allow transfers between contracts so fails validation.
    '0x777E2ae845272a2F540ebf6a3D03734A5a8f618e'.toLowerCase(),
]);
var TokenValidationResult;
(function (TokenValidationResult) {
    TokenValidationResult[TokenValidationResult["UNKN"] = 0] = "UNKN";
    TokenValidationResult[TokenValidationResult["FOT"] = 1] = "FOT";
    TokenValidationResult[TokenValidationResult["STF"] = 2] = "STF";
})(TokenValidationResult = exports.TokenValidationResult || (exports.TokenValidationResult = {}));
const TOKEN_VALIDATOR_ADDRESS = '0xb5ee1690b7dcc7859771148d0889be838fe108e0';
const AMOUNT_TO_FLASH_BORROW = '1000';
const GAS_LIMIT_PER_VALIDATE = 1000000;
class TokenValidatorProvider {
    constructor(chainId, multicall2Provider, tokenValidationCache, tokenValidatorAddress = TOKEN_VALIDATOR_ADDRESS, gasLimitPerCall = GAS_LIMIT_PER_VALIDATE, amountToFlashBorrow = AMOUNT_TO_FLASH_BORROW, allowList = DEFAULT_ALLOWLIST) {
        this.chainId = chainId;
        this.multicall2Provider = multicall2Provider;
        this.tokenValidationCache = tokenValidationCache;
        this.tokenValidatorAddress = tokenValidatorAddress;
        this.gasLimitPerCall = gasLimitPerCall;
        this.amountToFlashBorrow = amountToFlashBorrow;
        this.allowList = allowList;
        this.CACHE_KEY = (chainId, address) => `token-${chainId}-${address}`;
        this.BASES = [util_1.WRAPPED_NATIVE_CURRENCY[this.chainId].address];
    }
    async validateTokens(tokens, providerConfig) {
        const tokenAddressToToken = lodash_1.default.keyBy(tokens, 'address');
        const addressesRaw = (0, lodash_1.default)(tokens)
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
        util_1.log.info(`Got token validation results for ${addressesRaw.length - addresses.length} tokens from cache. Getting ${addresses.length} on-chain.`);
        const functionParams = (0, lodash_1.default)(addresses)
            .map((address) => [address, this.BASES, this.amountToFlashBorrow])
            .value();
        // We use the validate function instead of batchValidate to avoid poison pill problem.
        // One token that consumes too much gas could cause the entire batch to fail.
        const multicallResult = await this.multicall2Provider.callSameFunctionOnContractWithMultipleParams({
            address: this.tokenValidatorAddress,
            contractInterface: ITokenValidator__factory_1.ITokenValidator__factory.createInterface(),
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
                util_1.log.info({ result: resultWrapper }, `Failed to validate token ${token.symbol}`);
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
exports.TokenValidatorProvider = TokenValidatorProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4tdmFsaWRhdG9yLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy90b2tlbi12YWxpZGF0b3ItcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0RBQXVCO0FBRXZCLGdHQUE2RjtBQUM3RixrQ0FBZ0U7QUFNaEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FBUztJQUN4QywwRUFBMEU7SUFDMUUsNENBQTRDLENBQUMsV0FBVyxFQUFFO0NBQzNELENBQUMsQ0FBQztBQUVILElBQVkscUJBSVg7QUFKRCxXQUFZLHFCQUFxQjtJQUMvQixpRUFBUSxDQUFBO0lBQ1IsK0RBQU8sQ0FBQTtJQUNQLCtEQUFPLENBQUE7QUFDVCxDQUFDLEVBSlcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFJaEM7QUFNRCxNQUFNLHVCQUF1QixHQUFHLDRDQUE0QyxDQUFDO0FBQzdFLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDO0FBQ3RDLE1BQU0sc0JBQXNCLEdBQUcsT0FBUyxDQUFDO0FBc0J6QyxNQUFhLHNCQUFzQjtJQU1qQyxZQUNZLE9BQWdCLEVBQ2hCLGtCQUFzQyxFQUN4QyxvQkFBbUQsRUFDbkQsd0JBQXdCLHVCQUF1QixFQUMvQyxrQkFBa0Isc0JBQXNCLEVBQ3hDLHNCQUFzQixzQkFBc0IsRUFDNUMsWUFBWSxpQkFBaUI7UUFOM0IsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBK0I7UUFDbkQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUEwQjtRQUMvQyxvQkFBZSxHQUFmLGVBQWUsQ0FBeUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF5QjtRQUM1QyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQVovQixjQUFTLEdBQUcsQ0FBQyxPQUFnQixFQUFFLE9BQWUsRUFBRSxFQUFFLENBQ3hELFNBQVMsT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBYTlCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyw4QkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQ3pCLE1BQWUsRUFDZixjQUErQjtRQUUvQixNQUFNLG1CQUFtQixHQUFHLGdCQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RCxNQUFNLFlBQVksR0FBRyxJQUFBLGdCQUFDLEVBQUMsTUFBTSxDQUFDO2FBQzNCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUM3QixJQUFJLEVBQUU7YUFDTixLQUFLLEVBQUUsQ0FBQztRQUVYLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUMvQixNQUFNLGFBQWEsR0FBc0QsRUFBRSxDQUFDO1FBRTVFLG1FQUFtRTtRQUNuRSxLQUFLLE1BQU0sT0FBTyxJQUFJLFlBQVksRUFBRTtZQUNsQyxJQUNFLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUN0QyxFQUNEO2dCQUNBLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2xDLENBQUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQ3RDLENBQUUsQ0FBQzthQUNQO2lCQUFNO2dCQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDekI7U0FDRjtRQUVELFVBQUcsQ0FBQyxJQUFJLENBQ04sb0NBQ0UsWUFBWSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFDbEMsK0JBQStCLFNBQVMsQ0FBQyxNQUFNLFlBQVksQ0FDNUQsQ0FBQztRQUVGLE1BQU0sY0FBYyxHQUFHLElBQUEsZ0JBQUMsRUFBQyxTQUFTLENBQUM7YUFDaEMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ2pFLEtBQUssRUFBa0MsQ0FBQztRQUUzQyxzRkFBc0Y7UUFDdEYsNkVBQTZFO1FBQzdFLE1BQU0sZUFBZSxHQUNuQixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0Q0FBNEMsQ0FHeEU7WUFDQSxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtZQUNuQyxpQkFBaUIsRUFBRSxtREFBd0IsQ0FBQyxlQUFlLEVBQUU7WUFDN0QsWUFBWSxFQUFFLFVBQVU7WUFDeEIsY0FBYyxFQUFFLGNBQWM7WUFDOUIsY0FBYztZQUNkLGdCQUFnQixFQUFFO2dCQUNoQix1QkFBdUIsRUFBRSxJQUFJLENBQUMsZUFBZTthQUM5QztTQUNGLENBQUMsQ0FBQztRQUVMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBQ2xELE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUUsQ0FBQztZQUNuQyxNQUFNLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLENBQUUsQ0FBQztZQUVqRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTtnQkFDbkQsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7Z0JBRXhFLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsRUFDekQsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUUsQ0FDNUMsQ0FBQztnQkFFRixTQUFTO2FBQ1Y7WUFFRCwrRUFBK0U7WUFDL0UsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO2dCQUMxQixVQUFHLENBQUMsSUFBSSxDQUNOLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUN6Qiw0QkFBNEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUMzQyxDQUFDO2dCQUVGLFNBQVM7YUFDVjtZQUVELE1BQU0sZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsQ0FBQztZQUVsRCxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDeEMsZ0JBQXlDLENBQUM7WUFFNUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUN6RCxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBRSxDQUM1QyxDQUFDO1NBQ0g7UUFFRCxPQUFPO1lBQ0wsb0JBQW9CLEVBQUUsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUNyQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBckhELHdEQXFIQyJ9
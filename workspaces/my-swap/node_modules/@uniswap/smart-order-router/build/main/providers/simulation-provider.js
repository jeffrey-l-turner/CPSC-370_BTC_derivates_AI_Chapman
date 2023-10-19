"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simulator = exports.SimulationStatus = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
const universal_router_sdk_1 = require("@uniswap/universal-router-sdk");
const ethers_1 = require("ethers/lib/ethers");
const routers_1 = require("../routers");
const Erc20__factory_1 = require("../types/other/factories/Erc20__factory");
const Permit2__factory_1 = require("../types/other/factories/Permit2__factory");
const util_1 = require("../util");
var SimulationStatus;
(function (SimulationStatus) {
    SimulationStatus[SimulationStatus["Unattempted"] = 0] = "Unattempted";
    SimulationStatus[SimulationStatus["Failed"] = 1] = "Failed";
    SimulationStatus[SimulationStatus["Succeeded"] = 2] = "Succeeded";
})(SimulationStatus = exports.SimulationStatus || (exports.SimulationStatus = {}));
/**
 * Provider for dry running transactions.
 *
 * @export
 * @class Simulator
 */
class Simulator {
    /**
     * Returns a new SwapRoute with simulated gas estimates
     * @returns SwapRoute
     */
    constructor(provider, chainId) {
        this.chainId = chainId;
        this.provider = provider;
    }
    async simulate(fromAddress, swapOptions, swapRoute, amount, quote, l2GasData, providerConfig) {
        if (await this.userHasSufficientBalance(fromAddress, swapRoute.trade.tradeType, amount, quote)) {
            util_1.log.info('User has sufficient balance to simulate. Simulating transaction.');
            return this.simulateTransaction(fromAddress, swapOptions, swapRoute, l2GasData, providerConfig);
        }
        else {
            util_1.log.error('User does not have sufficient balance to simulate.');
            return Object.assign(Object.assign({}, swapRoute), { simulationStatus: SimulationStatus.Unattempted });
        }
    }
    async userHasSufficientBalance(fromAddress, tradeType, amount, quote) {
        try {
            const neededBalance = tradeType == sdk_core_1.TradeType.EXACT_INPUT ? amount : quote;
            let balance;
            if (neededBalance.currency.isNative) {
                balance = await this.provider.getBalance(fromAddress);
            }
            else {
                const tokenContract = Erc20__factory_1.Erc20__factory.connect(neededBalance.currency.address, this.provider);
                balance = await tokenContract.balanceOf(fromAddress);
            }
            const hasBalance = balance.gte(ethers_1.BigNumber.from(neededBalance.quotient.toString()));
            util_1.log.info({
                fromAddress,
                balance: balance.toString(),
                neededBalance: neededBalance.quotient.toString(),
                neededAddress: neededBalance.wrapped.currency.address,
                hasBalance,
            }, 'Result of balance check for simulation');
            return hasBalance;
        }
        catch (e) {
            util_1.log.error(e, 'Error while checking user balance');
            return false;
        }
    }
    async checkTokenApproved(fromAddress, inputAmount, swapOptions, provider) {
        // Check token has approved Permit2 more than expected amount.
        const tokenContract = Erc20__factory_1.Erc20__factory.connect(inputAmount.currency.wrapped.address, provider);
        if (swapOptions.type == routers_1.SwapType.UNIVERSAL_ROUTER) {
            const permit2Allowance = await tokenContract.allowance(fromAddress, universal_router_sdk_1.PERMIT2_ADDRESS);
            // If a permit has been provided we don't need to check if UR has already been allowed.
            if (swapOptions.inputTokenPermit) {
                util_1.log.info({
                    permitAllowance: permit2Allowance.toString(),
                    inputAmount: inputAmount.quotient.toString(),
                }, 'Permit was provided for simulation on UR, checking that Permit2 has been approved.');
                return permit2Allowance.gte(ethers_1.BigNumber.from(inputAmount.quotient.toString()));
            }
            // Check UR has been approved from Permit2.
            const permit2Contract = Permit2__factory_1.Permit2__factory.connect(universal_router_sdk_1.PERMIT2_ADDRESS, provider);
            const { amount: universalRouterAllowance, expiration: tokenExpiration } = await permit2Contract.allowance(fromAddress, inputAmount.currency.wrapped.address, util_1.SWAP_ROUTER_02_ADDRESS);
            const nowTimestampS = Math.round(Date.now() / 1000);
            const inputAmountBN = ethers_1.BigNumber.from(inputAmount.quotient.toString());
            const permit2Approved = permit2Allowance.gte(inputAmountBN);
            const universalRouterApproved = universalRouterAllowance.gte(inputAmountBN);
            const expirationValid = tokenExpiration > nowTimestampS;
            util_1.log.info({
                permitAllowance: permit2Allowance.toString(),
                tokenAllowance: universalRouterAllowance.toString(),
                tokenExpirationS: tokenExpiration,
                nowTimestampS,
                inputAmount: inputAmount.quotient.toString(),
                permit2Approved,
                universalRouterApproved,
                expirationValid,
            }, `Simulating on UR, Permit2 approved: ${permit2Approved}, UR approved: ${universalRouterApproved}, Expiraton valid: ${expirationValid}.`);
            return permit2Approved && universalRouterApproved && expirationValid;
        }
        else if (swapOptions.type == routers_1.SwapType.SWAP_ROUTER_02) {
            if (swapOptions.inputTokenPermit) {
                util_1.log.info({
                    inputAmount: inputAmount.quotient.toString(),
                }, 'Simulating on SwapRouter02 info - Permit was provided for simulation. Not checking allowances.');
                return true;
            }
            const allowance = await tokenContract.allowance(fromAddress, util_1.SWAP_ROUTER_02_ADDRESS);
            const hasAllowance = allowance.gte(ethers_1.BigNumber.from(inputAmount.quotient.toString()));
            util_1.log.info({
                hasAllowance,
                allowance: allowance.toString(),
                inputAmount: inputAmount.quotient.toString(),
            }, `Simulating on UR - Has allowance: ${hasAllowance}`);
            // Return true if token allowance is greater than input amount
            return hasAllowance;
        }
        throw new Error(`Unsupported swap type ${swapOptions}`);
    }
}
exports.Simulator = Simulator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdGlvbi1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvc2ltdWxhdGlvbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnREFBOEM7QUFDOUMsd0VBQWdFO0FBQ2hFLDhDQUE4QztBQUU5Qyx3Q0FBOEQ7QUFDOUQsNEVBQXlFO0FBQ3pFLGdGQUE2RTtBQUM3RSxrQ0FBK0U7QUFVL0UsSUFBWSxnQkFJWDtBQUpELFdBQVksZ0JBQWdCO0lBQzFCLHFFQUFlLENBQUE7SUFDZiwyREFBVSxDQUFBO0lBQ1YsaUVBQWEsQ0FBQTtBQUNmLENBQUMsRUFKVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQUkzQjtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBc0IsU0FBUztJQUc3Qjs7O09BR0c7SUFDSCxZQUFZLFFBQXlCLEVBQVksT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsQ0FDbkIsV0FBbUIsRUFDbkIsV0FBd0IsRUFDeEIsU0FBb0IsRUFDcEIsTUFBc0IsRUFDdEIsS0FBcUIsRUFDckIsU0FBNkMsRUFDN0MsY0FBK0I7UUFFL0IsSUFDRSxNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FDakMsV0FBVyxFQUNYLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUN6QixNQUFNLEVBQ04sS0FBSyxDQUNOLEVBQ0Q7WUFDQSxVQUFHLENBQUMsSUFBSSxDQUNOLGtFQUFrRSxDQUNuRSxDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQzdCLFdBQVcsRUFDWCxXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxjQUFjLENBQ2YsQ0FBQztTQUNIO2FBQU07WUFDTCxVQUFHLENBQUMsS0FBSyxDQUFDLG9EQUFvRCxD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
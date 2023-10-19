"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapRouterProvider = void 0;
const SwapRouter02__factory_1 = require("../types/other/factories/SwapRouter02__factory");
const util_1 = require("../util");
class SwapRouterProvider {
    constructor(multicall2Provider) {
        this.multicall2Provider = multicall2Provider;
    }
    async getApprovalType(tokenInAmount, tokenOutAmount) {
        var _a, _b;
        const functionParams = [
            [
                tokenInAmount.currency.wrapped.address,
                tokenInAmount.quotient.toString(),
            ],
            [
                tokenOutAmount.currency.wrapped.address,
                tokenOutAmount.quotient.toString(),
            ],
        ];
        const tx = await this.multicall2Provider.callSameFunctionOnContractWithMultipleParams({
            address: util_1.SWAP_ROUTER_02_ADDRESS,
            contractInterface: SwapRouter02__factory_1.SwapRouter02__factory.createInterface(),
            functionName: 'getApprovalType',
            functionParams,
        });
        if (!((_a = tx.results[0]) === null || _a === void 0 ? void 0 : _a.success) || !((_b = tx.results[1]) === null || _b === void 0 ? void 0 : _b.success)) {
            util_1.log.info({ results: tx.results }, 'Failed to get approval type from swap router for token in or token out');
            throw new Error('Failed to get approval type from swap router for token in or token out');
        }
        const { result: approvalTokenIn } = tx.results[0];
        const { result: approvalTokenOut } = tx.results[1];
        return {
            approvalTokenIn: approvalTokenIn[0],
            approvalTokenOut: approvalTokenOut[0],
        };
    }
}
exports.SwapRouterProvider = SwapRouterProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhcC1yb3V0ZXItcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3N3YXAtcm91dGVyLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDBGQUF1RjtBQUN2RixrQ0FBc0Q7QUE2QnRELE1BQWEsa0JBQWtCO0lBQzdCLFlBQXNCLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUcsQ0FBQztJQUV6RCxLQUFLLENBQUMsZUFBZSxDQUMxQixhQUF1QyxFQUN2QyxjQUF3Qzs7UUFFeEMsTUFBTSxjQUFjLEdBQXVCO1lBQ3pDO2dCQUNFLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU87Z0JBQ3RDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2FBQ2xDO1lBQ0Q7Z0JBQ0UsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDdkMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7YUFDbkM7U0FDRixDQUFDO1FBRUYsTUFBTSxFQUFFLEdBQ04sTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsNENBQTRDLENBR3hFO1lBQ0EsT0FBTyxFQUFFLDZCQUFzQjtZQUMvQixpQkFBaUIsRUFBRSw2Q0FBcUIsQ0FBQyxlQUFlLEVBQUU7WUFDMUQsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixjQUFjO1NBQ2YsQ0FBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLENBQUEsTUFBQSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQywwQ0FBRSxPQUFPLENBQUEsSUFBSSxDQUFDLENBQUEsTUFBQSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQywwQ0FBRSxPQUFPLENBQUEsRUFBRTtZQUN0RCxVQUFHLENBQUMsSUFBSSxDQUNOLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFDdkIsd0VBQXdFLENBQ3pFLENBQUM7WUFDRixNQUFNLElBQUksS0FBSyxDQUNiLHdFQUF3RSxDQUN6RSxDQUFDO1NBQ0g7UUFFRCxNQUFNLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEQsT0FBTztZQUNMLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ25DLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztTQUN0QyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBL0NELGdEQStDQyJ9
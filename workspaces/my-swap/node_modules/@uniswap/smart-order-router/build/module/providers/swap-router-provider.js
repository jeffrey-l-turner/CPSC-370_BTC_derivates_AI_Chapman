import { SwapRouter02__factory } from '../types/other/factories/SwapRouter02__factory';
import { log, SWAP_ROUTER_02_ADDRESS } from '../util';
export class SwapRouterProvider {
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
            address: SWAP_ROUTER_02_ADDRESS,
            contractInterface: SwapRouter02__factory.createInterface(),
            functionName: 'getApprovalType',
            functionParams,
        });
        if (!((_a = tx.results[0]) === null || _a === void 0 ? void 0 : _a.success) || !((_b = tx.results[1]) === null || _b === void 0 ? void 0 : _b.success)) {
            log.info({ results: tx.results }, 'Failed to get approval type from swap router for token in or token out');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhcC1yb3V0ZXItcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL3N3YXAtcm91dGVyLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxHQUFHLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUE2QnRELE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBc0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBRyxDQUFDO0lBRXpELEtBQUssQ0FBQyxlQUFlLENBQzFCLGFBQXVDLEVBQ3ZDLGNBQXdDOztRQUV4QyxNQUFNLGNBQWMsR0FBdUI7WUFDekM7Z0JBQ0UsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDdEMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7YUFDbEM7WUFDRDtnQkFDRSxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2dCQUN2QyxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTthQUNuQztTQUNGLENBQUM7UUFFRixNQUFNLEVBQUUsR0FDTixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0Q0FBNEMsQ0FHeEU7WUFDQSxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDLGVBQWUsRUFBRTtZQUMxRCxZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLGNBQWM7U0FDZixDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsQ0FBQSxNQUFBLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE9BQU8sQ0FBQSxJQUFJLENBQUMsQ0FBQSxNQUFBLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDBDQUFFLE9BQU8sQ0FBQSxFQUFFO1lBQ3RELEdBQUcsQ0FBQyxJQUFJLENBQ04sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUN2Qix3RUFBd0UsQ0FDekUsQ0FBQztZQUNGLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0VBQXdFLENBQ3pFLENBQUM7U0FDSDtRQUVELE1BQU0sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxNQUFNLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRCxPQUFPO1lBQ0wsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1NBQ3RDLENBQUM7SUFDSixDQUFDO0NBQ0YifQ==
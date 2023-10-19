import { PermitSingle } from '@uniswap/permit2-sdk';
import { RoutePlanner } from './routerCommands';
export interface Permit2Permit extends PermitSingle {
    signature: string;
}
export declare function encodePermit(planner: RoutePlanner, permit: Permit2Permit): void;

import { BigNumber } from '@ethersproject/bignumber';
import retry from 'async-retry';
import axios from 'axios';
import { log } from '../util/log';
import { IGasPriceProvider } from './gas-price-provider';
export class ETHGasStationInfoProvider extends IGasPriceProvider {
    constructor(url) {
        super();
        this.url = url;
    }
    async getGasPrice() {
        log.info(`About to get gas prices from gas station ${this.url}`);
        const response = await retry(async () => {
            return axios.get(this.url);
        }, { retries: 1 });
        const { data: gasPriceResponse, status } = response;
        if (status != 200) {
            log.error({ response }, `Unabled to get gas price from ${this.url}.`);
            throw new Error(`Unable to get gas price from ${this.url}`);
        }
        log.info({ gasPriceResponse }, 'Gas price response from API. About to parse "fast" to big number');
        // Gas prices from ethgasstation are in GweiX10.
        const gasPriceWei = BigNumber.from(gasPriceResponse.fast)
            .div(BigNumber.from(10))
            .mul(BigNumber.from(10).pow(9));
        log.info(`Gas price in wei: ${gasPriceWei} as of block ${gasPriceResponse.blockNum}`);
        return { gasPriceWei: gasPriceWei };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLWdhcy1zdGF0aW9uLWluZm8tZ2FzLXByaWNlLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9ldGgtZ2FzLXN0YXRpb24taW5mby1nYXMtcHJpY2UtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVsQyxPQUFPLEVBQVksaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQWlCbkUsTUFBTSxPQUFPLHlCQUEwQixTQUFRLGlCQUFpQjtJQUU5RCxZQUFZLEdBQVc7UUFDckIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVc7UUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQzFCLEtBQUssSUFBSSxFQUFFO1lBQ1QsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUF3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUNELEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUNmLENBQUM7UUFFRixNQUFNLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUVwRCxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7WUFDakIsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLGlDQUFpQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUV0RSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM3RDtRQUVELEdBQUcsQ0FBQyxJQUFJLENBQ04sRUFBRSxnQkFBZ0IsRUFBRSxFQUNwQixrRUFBa0UsQ0FDbkUsQ0FBQztRQUVGLGdEQUFnRDtRQUNoRCxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQzthQUN0RCxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2QixHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxHQUFHLENBQUMsSUFBSSxDQUNOLHFCQUFxQixXQUFXLGdCQUFnQixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FDNUUsQ0FBQztRQUVGLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUNGIn0=
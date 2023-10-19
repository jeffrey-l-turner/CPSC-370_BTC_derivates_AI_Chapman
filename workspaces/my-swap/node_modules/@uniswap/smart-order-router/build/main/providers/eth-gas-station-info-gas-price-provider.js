"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETHGasStationInfoProvider = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const async_retry_1 = __importDefault(require("async-retry"));
const axios_1 = __importDefault(require("axios"));
const log_1 = require("../util/log");
const gas_price_provider_1 = require("./gas-price-provider");
class ETHGasStationInfoProvider extends gas_price_provider_1.IGasPriceProvider {
    constructor(url) {
        super();
        this.url = url;
    }
    async getGasPrice() {
        log_1.log.info(`About to get gas prices from gas station ${this.url}`);
        const response = await (0, async_retry_1.default)(async () => {
            return axios_1.default.get(this.url);
        }, { retries: 1 });
        const { data: gasPriceResponse, status } = response;
        if (status != 200) {
            log_1.log.error({ response }, `Unabled to get gas price from ${this.url}.`);
            throw new Error(`Unable to get gas price from ${this.url}`);
        }
        log_1.log.info({ gasPriceResponse }, 'Gas price response from API. About to parse "fast" to big number');
        // Gas prices from ethgasstation are in GweiX10.
        const gasPriceWei = bignumber_1.BigNumber.from(gasPriceResponse.fast)
            .div(bignumber_1.BigNumber.from(10))
            .mul(bignumber_1.BigNumber.from(10).pow(9));
        log_1.log.info(`Gas price in wei: ${gasPriceWei} as of block ${gasPriceResponse.blockNum}`);
        return { gasPriceWei: gasPriceWei };
    }
}
exports.ETHGasStationInfoProvider = ETHGasStationInfoProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLWdhcy1zdGF0aW9uLWluZm8tZ2FzLXByaWNlLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9ldGgtZ2FzLXN0YXRpb24taW5mby1nYXMtcHJpY2UtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQXFEO0FBQ3JELDhEQUFnQztBQUNoQyxrREFBMEI7QUFFMUIscUNBQWtDO0FBRWxDLDZEQUFtRTtBQWlCbkUsTUFBYSx5QkFBMEIsU0FBUSxzQ0FBaUI7SUFFOUQsWUFBWSxHQUFXO1FBQ3JCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXO1FBQ3RCLFNBQUcsQ0FBQyxJQUFJLENBQUMsNENBQTRDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBQSxxQkFBSyxFQUMxQixLQUFLLElBQUksRUFBRTtZQUNULE9BQU8sZUFBSyxDQUFDLEdBQUcsQ0FBd0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELENBQUMsRUFDRCxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FDZixDQUFDO1FBRUYsTUFBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFFcEQsSUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO1lBQ2pCLFNBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxpQ0FBaUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFFdEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDN0Q7UUFFRCxTQUFHLENBQUMsSUFBSSxDQUNOLEVBQUUsZ0JBQWdCLEVBQUUsRUFDcEIsa0VBQWtFLENBQ25FLENBQUM7UUFFRixnREFBZ0Q7UUFDaEQsTUFBTSxXQUFXLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO2FBQ3RELEdBQUcsQ0FBQyxxQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2QixHQUFHLENBQUMscUJBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsU0FBRyxDQUFDLElBQUksQ0FDTixxQkFBcUIsV0FBVyxnQkFBZ0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQzVFLENBQUM7UUFFRixPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRjtBQXhDRCw4REF3Q0MifQ==
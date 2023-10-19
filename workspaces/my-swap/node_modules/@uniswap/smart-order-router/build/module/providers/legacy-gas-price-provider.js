import { log } from '../util';
import { IGasPriceProvider } from './gas-price-provider';
export class LegacyGasPriceProvider extends IGasPriceProvider {
    constructor(provider) {
        super();
        this.provider = provider;
    }
    async getGasPrice() {
        const gasPriceWei = await this.provider.getGasPrice();
        log.info({ gasPriceWei }, `Got gas price ${gasPriceWei} using eth_gasPrice RPC`);
        return {
            gasPriceWei,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LWdhcy1wcmljZS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvbGVnYWN5LWdhcy1wcmljZS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTlCLE9BQU8sRUFBWSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRW5FLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxpQkFBaUI7SUFDM0QsWUFBc0IsUUFBeUI7UUFDN0MsS0FBSyxFQUFFLENBQUM7UUFEWSxhQUFRLEdBQVIsUUFBUSxDQUFpQjtJQUUvQyxDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVc7UUFDdEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RELEdBQUcsQ0FBQyxJQUFJLENBQ04sRUFBRSxXQUFXLEVBQUUsRUFDZixpQkFBaUIsV0FBVyx5QkFBeUIsQ0FDdEQsQ0FBQztRQUVGLE9BQU87WUFDTCxXQUFXO1NBQ1osQ0FBQztJQUNKLENBQUM7Q0FDRiJ9
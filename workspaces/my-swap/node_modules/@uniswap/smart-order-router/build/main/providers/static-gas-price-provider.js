"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticGasPriceProvider = void 0;
class StaticGasPriceProvider {
    constructor(gasPriceWei) {
        this.gasPriceWei = gasPriceWei;
    }
    async getGasPrice() {
        return { gasPriceWei: this.gasPriceWei };
    }
}
exports.StaticGasPriceProvider = StaticGasPriceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWdhcy1wcmljZS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvc3RhdGljLWdhcy1wcmljZS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxNQUFhLHNCQUFzQjtJQUNqQyxZQUFvQixXQUFzQjtRQUF0QixnQkFBVyxHQUFYLFdBQVcsQ0FBVztJQUFHLENBQUM7SUFDOUMsS0FBSyxDQUFDLFdBQVc7UUFDZixPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0NBQ0Y7QUFMRCx3REFLQyJ9
export class StaticGasPriceProvider {
    constructor(gasPriceWei) {
        this.gasPriceWei = gasPriceWei;
    }
    async getGasPrice() {
        return { gasPriceWei: this.gasPriceWei };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWdhcy1wcmljZS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvc3RhdGljLWdhcy1wcmljZS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQW9CLFdBQXNCO1FBQXRCLGdCQUFXLEdBQVgsV0FBVyxDQUFXO0lBQUcsQ0FBQztJQUM5QyxLQUFLLENBQUMsV0FBVztRQUNmLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLENBQUM7Q0FDRiJ9
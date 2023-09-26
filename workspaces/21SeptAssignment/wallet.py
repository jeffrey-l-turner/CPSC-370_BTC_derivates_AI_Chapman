class Wallet:
    def __init__(self):
        # Initialize wallet with default cryptocurrencies
        self.wallet = {"BTC": 0, "ETH": 0}

    def view_wallet(self):
        for currency, amount in self.wallet.items():
            print(f"{currency}: {amount}")

    def add_currency(self, currency):
        if currency not in self.wallet:
            self.wallet[currency] = 0
            print(f"Added {currency} to wallet.")
        else:
            print(f"{currency} is already in the wallet.")

    def remove_currency(self, currency):
        if currency in self.wallet:
            del self.wallet[currency]
            print(f"Removed {currency} from wallet.")
        else:
            print(f"{currency} is not in the wallet.")

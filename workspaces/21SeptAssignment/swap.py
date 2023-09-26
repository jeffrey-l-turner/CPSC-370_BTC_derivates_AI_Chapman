class Swap:
    def __init__(self, wallet):
        self.wallet = wallet

    def __init__(self, wallet, transaction):
        self.wallet = wallet
        self.transaction = transaction

    def make_swap(self, from_currency, to_currency, amount):
        # Check if the from_currency is not the same as the to_currency
        if from_currency == to_currency:
            print("Cannot swap the same currency.")
            return
        # Check if the wallet has enough of the from_currency
        if self.wallet[from_currency] < amount:
            print("Not enough currency to make the swap.")
            return
        # Deduct the amount from the from_currency and add it to the to_currency
        self.wallet[from_currency] -= amount
        self.wallet[to_currency] += amount
        # Record the transaction
        self.transaction.transactions.append(f"Swapped {amount} {from_currency} for {amount} {to_currency}.")
        print(f"Swapped {amount} {from_currency} for {amount} {to_currency}.")

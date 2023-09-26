class Transaction:
    def __init__(self):
        # Initialize transaction history
        self.transactions = []

    def view_transactions(self):
        for i, transaction in enumerate(self.transactions, 1):
            print(f"Transaction {i}: {transaction}")

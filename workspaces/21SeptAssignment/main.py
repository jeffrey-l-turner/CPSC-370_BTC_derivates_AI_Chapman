# Import necessary modules
from swap import Swap
from wallet import Wallet
from transaction import Transaction

def main():
    # Create instances of our classes
    wallet = Wallet()
    swap = Swap(wallet)
    transaction = Transaction()

    # Application logic
    while True:
        print("1. View Wallet")
        print("2. Make a Swap")
        print("3. View Transaction History")
        print("4. Exit")
        choice = input("Enter your choice: ")
        if choice == "1":
            wallet.view_wallet()
        elif choice == "2":
            from_currency = input("Enter the currency you want to swap from: ")
            to_currency = input("Enter the currency you want to swap to: ")
            amount = float(input("Enter the amount you want to swap: "))
            swap.make_swap(from_currency, to_currency, amount)
        elif choice == "3":
            transaction.view_transactions()
        elif choice == "4":
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()

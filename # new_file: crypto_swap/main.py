import swap
import wallet

def main():
    # Create a new wallet
    user_wallet = wallet.Wallet()

    # Perform a swap
    swap.perform_swap(user_wallet)

if __name__ == "__main__":
    main()

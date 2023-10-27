# Automated Market Maker (AMM)

class Liquidity:
    def __init__(self, proportion):
        self.proportion = proportion        



class Reserve:
    def __init__(self, token_0, token_1):
        self.token_0 = token_0
        self.token_1 = token_1

    def total_liquidity(self):
        # Returns the sum of the amounts of the two tokens.
        return self.token_0 + self.token_1

    def add_liquidity(self, amount_of_token_0, amount_of_token_1):
        # Adds liquidity to the reserve.
        self.token_0 += amount_of_token_0
        self.token_1 += amount_of_token_1

        # Return the new reserve.
        return self

    def remove_liquidity(self, liquidity):
        # Removes liquidity from the reserve.
        amount_to_remove_from_token_0 = self.token_0 * liquidity.proportion
        amount_to_remove_from_token_1 = self.token_1 * liquidity.proportion
        self.token_0 -= amount_to_remove_from_token_0
        self.token_1 -= amount_to_remove_from_token_1

        # Return the new reserve, along with the amounts removed from the two tokens.
        return [self, [amount_to_remove_from_token_0, amount_to_remove_from_token_1]]

    def swap(self, input_token, amount_to_swap):
        # Swaps one token for another.
        original_product = self.token_0 * self.token_1
        if input_token == self.token_0:
            self.token_0 -= amount_to_swap
            token_1_original = self.token_1
            self.token_1 = original_product / self.token_0
            amount_other_token_increased = self.token_1 - token_1_original
        else:
            self.token_1 -= amount_to_swap
            token_0_original = self.token_0
            self.token_0 = original_product / self.token_1
            amount_other_token_increased = self.token_0 - token_0_original

        # Return the new reserve, along with the amount the other token increased by.
        return [self, amount_other_token_increased]

    def print_tokens(self):
        # Prints the current amounts of the two tokens of the reserve.
        print("token_0: ", self.token_0)
        print("token_1: ", self.token_1)



tokenA = 100
tokenB = 200
reserve = Reserve(tokenA, tokenB)
liquidity = Liquidity(0.25)
print("Original reserve:")
reserve.print_tokens()
print()

reserve.add_liquidity(100, 100)
print("After adding 100 to each token:")
reserve.print_tokens()
print()

amounts_removed = reserve.remove_liquidity(liquidity)[1] # decreases the total token amount by 25%, with the amounts of the two tokens still maintaining the same ratio.
print("After removing 25% liquidity:")
reserve.print_tokens()
print("{} has been removed from token A, and {} has been removed from token B.".format(amounts_removed[0], amounts_removed[1]))
print()

amount_other_token_increased = reserve.swap(reserve.token_0, 10)[1]
print("After swapping tokens:")    # subtracts 10 from token A and increases token B so that the product of the amounts of the tokens is maintained.
reserve.print_tokens()
print("Swapping 10 from token A has caused token B to increase by {}.".format(amount_other_token_increased))


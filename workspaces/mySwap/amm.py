class AMM:
    def __init__(self, token_0, token_1, reserve_0, reserve_1):
        """Initializes an AMM.

        Args:
            token_0: The first token in the AMM.
            token_1: The second token in the AMM.
            reserve_0: The reserve balance of token 0.
            reserve_1: The reserve balance of token 1.
        """

        self.token_0 = token_0
        self.token_1 = token_1
        self.reserve_0 = reserve_0
        self.reserve_1 = reserve_1

    def total_liquidity(self):
        """Calculates the total liquidity of the AMM.

        Returns:
            The total liquidity of the AMM.
        """

        return self.reserve_0 + self.reserve_1

    def add_liquidity(self, amount_of_token_0, amount_of_token_1):
        """Adds liquidity to the AMM.

        Args:
            amount_of_token_0: The amount of token 0 to add.
            amount_of_token_1: The amount of token 1 to add.
        """

        self.reserve_0 += amount_of_token_0
        self.reserve_1 += amount_of_token_1

    def remove_liquidity(self, amount_of_lp_tokens):
        """Removes liquidity from the AMM.

        Args:
            amount_of_lp_tokens: The amount of LP tokens to remove.
        """

        self.reserve_0 -= amount_of_lp_tokens * self.reserve_0 / self.total_liquidity()
        self.reserve_1 -= amount_of_lp_tokens * self.reserve_1 / self.total_liquidity()

    def swap(self, amount_of_token_in, amount_of_token_out_min):
        """Swaps one token for another.

        Args:
            amount_of_token_in: The amount of token in to swap.
            amount_of_token_out_min: The minimum amount of token out to receive.
        """

        # Calculate the amount of token out to receive.
        amount_of_token_out = self.reserve_1 * amount_of_token_in / (self.reserve_0 + amount_of_token_in)

        # Check if the amount of token out to receive is at least the minimum amount.
        if amount_of_token_out < amount_of_token_out_min:
            raise Exception("Not enough liquidity.")

        # Update the reserves.
        self.reserve_0 += amount_of_token_in
        self.reserve_1 -= amount_of_token_out

        return amount_of_token_out

    def print_values(self):
        print("token_0: ", self.token_0)
        print("token_1: ", self.token_1)
        print("reserve_0: ", self.reserve_0)
        print("reserve_1: ", self.reserve_1)
        print("\n")



amm = AMM(100, 200, 200, 400)
print("Original amm:")
amm.print_values()

amm.add_liquidity(100, 100)
print("After adding 100 to each reserve:")
amm.print_values()

amm.remove_liquidity(25)
print("After removing 25 from the total reserve, with the two reserves still maintaining the same ratio:")
amm.print_values()

amm.swap(20, 10)
print("After adding 20 to reserve 0 and subtracting the fraction 20 / (20 + original value of reserve 0) of reserve 1 from reserve 1:")
amm.print_values()

class CentralLimitOrderBook:
    def __init__(self):
        self.orders = {}

    def add_order(self, order):
        # Check if the order is valid
        if order["type"] not in ["buy", "sell"]:
            raise ValueError("Invalid order type")

        # Add the order to the order book
        self.orders[order["id"]] = order

    def remove_order(self, order_id):
        # Remove the order from the order book
        del self.orders[order_id]

    def get_best_ask(self):
        # Get the best ask order
        best_ask = None
        for order in self.orders.values():
            if order["type"] == "sell" and (best_ask is None or order["price"] < best_ask["price"]):
                best_ask = order

        return best_ask

    def get_best_bid(self):
        # Get the best bid order
        best_bid = None
        for order in self.orders.values():
            if order["type"] == "buy" and (best_bid is None or order["price"] > best_bid["price"]):
                best_bid = order

        return best_bid

    def match_orders(self):
        """
        Matches buy and sell orders with matching prices in a CLOB.

        Args:
            clob: A CLOB object.

        Returns:
            A list of matched orders.
        """

        # Get the best bid and ask orders.
        best_bid = self.get_best_bid()
        best_ask = self.get_best_ask()

        # If there is a match, remove the orders from the CLOB and return them.
        if best_bid is not None and best_ask is not None and best_bid["price"] == best_ask["price"]:
            matched_orders = [best_bid, best_ask]

            self.remove_order(best_bid["id"])
            self.remove_order(best_ask["id"])

            return matched_orders

        # If there is no match, return an empty list.
        else:
            return []
                        
    def print_orders(self):
    	# Print the orders in the order book
        for i in range(len(self.orders)):
            print(self.orders[list(self.orders.keys())[i]])
        print("\n")


order_book = CentralLimitOrderBook()

order_book.add_order({"id": 0, "type": "buy", "price": 0, "quantity": 0})
order_book.add_order({"id": 1, "type": "buy", "price": 100, "quantity": 10})
order_book.add_order({"id": 2, "type": "buy", "price": 200, "quantity": 20})
order_book.add_order({"id": 3, "type": "buy", "price": 300, "quantity": 30})
order_book.add_order({"id": 4, "type": "buy", "price": 300, "quantity": 30})
order_book.add_order({"id": 5, "type": "sell", "price": 300, "quantity": 30})

print("Original order book: ")
order_book.print_orders()

print("The following mathced orders have been removed: ")
matched_orders = order_book.match_orders()
print(matched_orders)
while matched_orders != []:
    matched_orders = order_book.match_orders()
    if matched_orders != []:
        print(matched_orders)
print("\n")

print("New order book: ")
order_book.print_orders()

# Order 4 was not removed from the order book because matching is first-come-first-served.
# Because order 3 was added to the order book before order 4, order 3 (but not order 4) was matched out with order 5.


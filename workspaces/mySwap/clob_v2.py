# Central Limit Order Book (CLOB)

class Order:
    def __init__(self, id, type, price, quantity):
        self.id = id
        self.type = type
        self.price = price
        self.quantity = quantity

    def print_order(self):
        # Print the order.
        print("id: {}, ".format(self.id), end='')
        print("type: {}, ".format(self.type), end='')
        print("price: {}, ".format(self.price), end='')
        print("quantity: {}".format(self.quantity))



class OrderBook:
    def __init__(self):
        self.orders = []

    def add_order(self, input_order):
        # Check if the order is valid
        if input_order.type not in ["buy", "sell"]:
            raise ValueError("Invalid order type")

        # Add the order to the order book, maintaining the order of the prices from highest to lowest.
        index_to_insert = 0
        for order in self.orders:
            if input_order.price > order.price:
                break
            index_to_insert += 1
        self.orders.insert(index_to_insert, input_order)

        # Return the new order book.
        return self

    def remove_order(self, input_id):
        # Check whether the input id exists in the order book.
        id_found = False
        for i in range(len(self.orders)):
            if input_id == self.orders[i].id:
                order_to_remove = self.orders[i]
                id_found = True
                break
        
        # Remove the order from the order book, if the id is found.
        if id_found:
            self.orders.remove(order_to_remove)

        # Return the new order book.
        return self

    def get_best_ask(self):
        # Get the best ask order.
        best_ask = None
        for order in self.orders:
            if order.type == "sell" and (best_ask is None or order.price < best_ask.price):
                best_ask = order

        return best_ask

    def get_best_bid(self):
        # Get the best bid order.
        best_bid = None
        for order in self.orders:
            if order.type == "buy" and (best_bid is None or order.price > best_bid.price):
                best_bid = order

        return best_bid

    def match_orders(self):
        # Matches buy and sell orders with matching prices in the order book.

        # Get the best bid and ask orders.
        best_bid = self.get_best_bid()
        best_ask = self.get_best_ask()

        # If there are matching orders, remove them from the order book.
        if best_bid is not None and best_ask is not None and best_bid.price == best_ask.price:
            matched_orders = [best_bid, best_ask]

            self.remove_order(best_bid.id)
            self.remove_order(best_ask.id)
        else:
            matched_orders = []

        # Return the new order book, along with the matched orders
        return [self, matched_orders]
                        
    def print_orders(self):
    	# Print the orders in the order book.
        for order in self.orders:
            order.print_order()



order_book = OrderBook()

order0 = Order("0", "buy", 0, 0)
order1 = Order("1", "buy", 100, 10)
order2 = Order("2", "buy", 200, 20)
order3 = Order("3", "buy", 300, 30)
order4 = Order("4", "buy", 300, 30)
order5 = Order("5", "sell", 300, 30)

order_book.add_order(order0)
order_book.add_order(order1)
order_book.add_order(order2)
order_book.add_order(order3)
order_book.add_order(order4)
order_book.add_order(order5)

print("Original order book: ")
order_book.print_orders()
print()

matched_orders = order_book.match_orders()[1]
print("The following mathced orders have been removed: ")
for matched_order in matched_orders:
    matched_order.print_order()
print()

print("New order book: ")
order_book.print_orders()

# Order 4 was not removed from the order book because matching is first-come-first-served.
# Because order 3 was added to the order book before order 4, order 3 (but not order 4) was matched out with order 5.


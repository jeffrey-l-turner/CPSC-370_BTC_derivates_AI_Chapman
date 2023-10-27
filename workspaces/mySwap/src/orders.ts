export type Order = {
	id: string;
	type: "BUY" | "SELL";
	price: number;
	quantity: number;
};

export type OrderBook = Order[];

export type Reserve = {
	tokenX: number;
	tokenY: number;
};

export type Liquidity = {
	proportion: number;
};

export function placeOrder(order: Order, orderBook: OrderBook): OrderBook {
	const newOrderBook = [...orderBook, order];

	return newOrderBook.sort((a, b) => {
		// If same type, sort by price; otherwise, by type
		if (a.type === b.type) {
			if (a.type === "SELL") return a.price - b.price; // Ascending for SELL
			return b.price - a.price; // Descending for BUY
		}
		return a.type === "SELL" ? 1 : -1;
	});
}

export function cancelOrder(id: string, orderBook: OrderBook): OrderBook {
	return orderBook.filter((order) => order.id !== id);
}

export function matchOrders(orderBook: OrderBook): { newOrderBook: OrderBook; matchedOrders: Order[] } {
	const buyOrders = orderBook.filter((order) => order.type === "BUY");
	const sellOrders = orderBook.filter((order) => order.type === "SELL");

	const matchedOrders: Order[] = [];

	for (let i = 0; i < buyOrders.length; i++) {
		for (let j = 0; j < sellOrders.length; j++) {
			if (buyOrders[i].price >= sellOrders[j].price) {
				matchedOrders.push(buyOrders[i], sellOrders[j]);

				// Removing these orders from their respective arrays
				buyOrders.splice(i, 1);
				sellOrders.splice(j, 1);

				i--;
				j--;
			}
		}
	}

	return {
		newOrderBook: [...buyOrders, ...sellOrders],
		matchedOrders,
	};
}

export function addLiquidity(amountToAdd: Reserve, currentReserve: Reserve): Reserve {
	return {
		tokenX: currentReserve.tokenX + amountToAdd.tokenX,
		tokenY: currentReserve.tokenY + amountToAdd.tokenY,
	};
}

export function removeLiquidity(
	liquidity: Liquidity,
	currentReserve: Reserve
): { newReserve: Reserve; removedAmount: Reserve } {
	const removedX = currentReserve.tokenX * liquidity.proportion;
	const removedY = currentReserve.tokenY * liquidity.proportion;

	return {
		newReserve: {
			tokenX: currentReserve.tokenX - removedX,
			tokenY: currentReserve.tokenY - removedY,
		},
		removedAmount: {
			tokenX: removedX,
			tokenY: removedY,
		},
	};
}

export function swap(isTokenX: boolean, amount: number, reserve: Reserve): SwapResult {
	const { tokenX, tokenY } = reserve;

	// Invariant before the swap
	const k = tokenX * tokenY;

	if (isTokenX) {
		// Swapping tokenX for tokenY
		const newTokenX = tokenX + amount;
		const newTokenY = k / newTokenX;
		const deltaY = tokenY - newTokenY;

		return {
			newReserve: { tokenX: newTokenX, tokenY: newTokenY },
			receivedAmount: deltaY,
		};
	} else {
		// Swapping tokenY for tokenX
		const newTokenY = tokenY + amount;
		const newTokenX = k / newTokenY;
		const deltaX = tokenX - newTokenX;

		return {
			newReserve: { tokenX: newTokenX, tokenY: newTokenY },
			receivedAmount: deltaX,
		};
	}
}

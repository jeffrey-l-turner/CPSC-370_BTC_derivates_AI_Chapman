// Data Structures for CLOB

type Order = {
  id: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
};

type OrderBook = Order[];

// Data Structures for AMM

type Reserve = {
  tokenX: number;
  tokenY: number;
};

type Liquidity = {
  proportion: number;
};
// CLOB Functions

function placeOrder(order: Order, orderBook: OrderBook): OrderBook {
  // Insert the new order into the order book in the correct position
  // Orders should be sorted from highest to lowest price
  const newOrderBook = [...orderBook];
  const index = newOrderBook.findIndex(o => order.type === 'BUY' ? o.price < order.price : o.price > order.price);
  if (index === -1) {
    newOrderBook.push(order);
  } else {
    newOrderBook.splice(index, 0, order);
  }
  return newOrderBook;
}

function cancelOrder(id: string, orderBook: OrderBook): OrderBook {
  // Return a new order book with the order with the matching id removed
  return orderBook.filter(order => order.id !== id);
}

function matchOrders(orderBook: OrderBook): { matchedOrders: Order[], newOrderBook: OrderBook } {
  // Match buy and sell orders with the same price and remove them from the order book
  const matchedOrders: Order[] = [];
  const newOrderBook = orderBook.filter(order => {
    const oppositeType = order.type === 'BUY' ? 'SELL' : 'BUY';
    const matchIndex = orderBook.findIndex(o => o.type === oppositeType && o.price === order.price);
    if (matchIndex !== -1) {
      matchedOrders.push(order, orderBook[matchIndex]);
      return false;
    }
    return true;
  });
  return { matchedOrders, newOrderBook };
}
// AMM Functions

function addLiquidity(amount: Reserve, currentReserve: Reserve): Reserve {
  // Return a new reserve with the amounts of each token increased
  return {
    tokenX: currentReserve.tokenX + amount.tokenX,
    tokenY: currentReserve.tokenY + amount.tokenY
  };
}

function removeLiquidity(liquidity: Liquidity, currentReserve: Reserve): { removed: Reserve, newReserve: Reserve } {
  // Return a new reserve with the amount of each token decreased by the appropriate amount
  const removed = {
    tokenX: currentReserve.tokenX * liquidity.proportion,
    tokenY: currentReserve.tokenY * liquidity.proportion
  };
  const newReserve = {
    tokenX: currentReserve.tokenX - removed.tokenX,
    tokenY: currentReserve.tokenY - removed.tokenY
  };
  return { removed, newReserve };
}

function swap(tokenToRemove: 'tokenX' | 'tokenY', amount: number, currentReserve: Reserve): { newReserve: Reserve, amountReceived: number } {
  // Calculate the amount of the other token based on the invariant x*y=k
  const k = currentReserve.tokenX * currentReserve.tokenY;
  let newReserve: Reserve;
  let amountReceived: number;
  if (tokenToRemove === 'tokenX') {
    newReserve = {
      tokenX: currentReserve.tokenX - amount,
      tokenY: k / (currentReserve.tokenX - amount)
    };
    amountReceived = newReserve.tokenY - currentReserve.tokenY;
  } else {
    newReserve = {
      tokenX: k / (currentReserve.tokenY - amount),
      tokenY: currentReserve.tokenY - amount
    };
    amountReceived = newReserve.tokenX - currentReserve.tokenX;
  }
  return { newReserve, amountReceived };
}

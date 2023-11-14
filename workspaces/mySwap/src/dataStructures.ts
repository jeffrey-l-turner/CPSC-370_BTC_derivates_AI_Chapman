// Data Structures for CLOB

type Order = {
  id: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
};

type OrderBook = Order[];

// Functions for CLOB

function placeOrder(order: Order, orderBook: OrderBook): OrderBook {
  return [...orderBook, order];
}

function cancelOrder(id: string, orderBook: OrderBook): OrderBook {
  return orderBook.filter(order => order.id !== id);
}

function matchOrders(orderBook: OrderBook): { matchedOrders: Order[], newOrderBook: OrderBook } {
  const buyOrders = orderBook.filter(order => order.type === 'BUY').sort((a, b) => b.price - a.price);
  const sellOrders = orderBook.filter(order => order.type === 'SELL').sort((a, b) => a.price - b.price);
  const matchedOrders: Order[] = [];
  
  while (buyOrders.length > 0 && sellOrders.length > 0) {
    const buyOrder = buyOrders[0];
    const sellOrder = sellOrders[0];
    
    if (buyOrder.price >= sellOrder.price) {
      const quantity = Math.min(buyOrder.quantity, sellOrder.quantity);
      matchedOrders.push({ ...buyOrder, quantity }, { ...sellOrder, quantity });
      
      if (buyOrder.quantity > sellOrder.quantity) {
        buyOrder.quantity -= sellOrder.quantity;
        sellOrders.shift();
      } else if (buyOrder.quantity < sellOrder.quantity) {
        sellOrder.quantity -= buyOrder.quantity;
        buyOrders.shift();
      } else {
        buyOrders.shift();
        sellOrders.shift();
      }
    } else {
      break;
    }
  }
  
  return { matchedOrders, newOrderBook: [...buyOrders, ...sellOrders] };
}

// Data Structures for AMM

type Reserve = {
  tokenX: number;
  tokenY: number;
};

type Liquidity = {
  proportion: number;
};

// Functions for AMM

function addLiquidity(amount: Reserve, reserve: Reserve): Reserve {
  return { tokenX: reserve.tokenX + amount.tokenX, tokenY: reserve.tokenY + amount.tokenY };
}

function removeLiquidity(liquidity: Liquidity, reserve: Reserve): { newReserve: Reserve, removed: Reserve } {
  const removed = { tokenX: reserve.tokenX * liquidity.proportion, tokenY: reserve.tokenY * liquidity.proportion };
  const newReserve = { tokenX: reserve.tokenX - removed.tokenX, tokenY: reserve.tokenY - removed.tokenY };
  return { newReserve, removed };
}

function swap(inputToken: 'tokenX' | 'tokenY', amount: number, reserve: Reserve): { newReserve: Reserve, outputAmount: number } {
  const inputAmount = reserve[inputToken];
  const outputToken = inputToken === 'tokenX' ? 'tokenY' : 'tokenX';
  const outputAmount = reserve[outputToken];
  
  const newInputAmount = inputAmount - amount;
  const newOutputAmount = outputAmount * inputAmount / newInputAmount;
  
  const newReserve = { ...reserve, [inputToken]: newInputAmount, [outputToken]: newOutputAmount };
  const outputAmount = outputAmount - newOutputAmount;
  
  return { newReserve, outputAmount };
}

export { Order, OrderBook, placeOrder, cancelOrder, matchOrders, Reserve, Liquidity, addLiquidity, removeLiquidity, swap };

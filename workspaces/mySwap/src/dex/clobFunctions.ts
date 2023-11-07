import { Order, OrderBook} from './dexModels';

function placeOrder(order: Order, orderBook: OrderBook): OrderBook {
    // Create a copy of the existing order book to avoid mutation
    const newOrderBook = [...orderBook, order];

    // Sort the order book based on type and price
    newOrderBook.sort((a, b) => {
        if (a.type === b.type) {
        return a.type === 'BUY' ? b.price - a.price : a.price - b.price; // Descending for BUY and Ascending for SELL
        }
        return a.type === 'BUY' ? -1 : 1; // BUY orders before SELL orders
    });

    return newOrderBook;
}

function cancelOrder(id: string, orderBook: OrderBook): OrderBook {
    return orderBook.filter(order => order.id !== id);
}

function matchOrders(orderBook: OrderBook): { updatedOrderBook: OrderBook, matchedOrders: Order[] } {
    const buyOrders = orderBook.filter(order => order.type === 'BUY');
    const sellOrders = orderBook.filter(order => order.type === 'SELL');
  
    const matchedOrders: Order[] = [];
  
    const updatedOrderBook = orderBook.filter(order => {
      if (order.type === 'BUY' && sellOrders.some(sellOrder => sellOrder.price <= order.price)) {
        matchedOrders.push(order);
        return false;
      }
      if (order.type === 'SELL' && buyOrders.some(buyOrder => buyOrder.price >= order.price)) {
        matchedOrders.push(order);
        return false;
      }
      return true;
    });
  
    return { updatedOrderBook, matchedOrders };
}
  
export { placeOrder, cancelOrder, matchOrders };
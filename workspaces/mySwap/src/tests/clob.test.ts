// src/tests/clobTests.ts

import { placeOrder, cancelOrder, matchOrders } from '../dex/clobFunctions';
import { sampleOrderBook } from '../dex/sampleData';
import { Order } from '../dex/dexModels';

describe("CLOB Functions", () => {
  
  test("placeOrder should add order correctly", () => {
    const newOrder: Order = { id: "3", type: 'BUY', price: 105, quantity: 2 };
    const updatedOrderBook = placeOrder(newOrder, sampleOrderBook);
    
    expect(updatedOrderBook).toContain(newOrder);
    // Additional assertions depending on the order placement logic.
  });

  test("cancelOrder should remove order correctly", () => {
    const updatedOrderBook = cancelOrder("1", sampleOrderBook);
    
    const cancelledOrder = sampleOrderBook.find(order => order.id === "1");
    expect(updatedOrderBook).not.toContain(cancelledOrder);
  });

  test("matchOrders should match orders correctly", () => {
    const { updatedOrderBook, matchedOrders } = matchOrders(sampleOrderBook);

    // Based on your matching logic, you'd want to ensure:
    // 1. Matched orders are removed from the order book
    // 2. The `matched` array contains the correct orders.
    // Example: (you'd adjust based on your matching logic)
    expect(matchedOrders).toHaveLength(0); // Assuming no matches in the sample data.
    expect(updatedOrderBook).toEqual(sampleOrderBook); // Assuming no orders were matched and removed.
  });

  // ... add more tests as needed.
});

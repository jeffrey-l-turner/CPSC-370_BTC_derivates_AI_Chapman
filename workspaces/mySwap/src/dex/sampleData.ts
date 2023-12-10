// src/dex/sampleData.ts

import { Order, Reserve } from './dexModels.js';

export const sampleOrderBook: Order[] = [
  { id: "1", type: 'BUY', price: 100, quantity: 5 },
  { id: "2", type: 'SELL', price: 110, quantity: 3 },
  // ... add more sample orders
];

export const sampleReserve: Reserve = {
  tokenX: 1000,
  tokenY: 2000,
};

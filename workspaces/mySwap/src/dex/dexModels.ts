// src/models/dexModels.ts

// Data Structures for CLOB

export type Order = {
  id: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
};

export type OrderBook = Order[];

// Data Structures for AMM

export type Reserve = {
  tokenX: number;
  tokenY: number;
};

export type Liquidity = {
  proportion: number;
};

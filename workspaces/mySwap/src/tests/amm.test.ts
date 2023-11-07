// src/tests/ammTests.ts

import { addLiquidity, removeLiquidity, swap, getReserves } from '../dex/ammFunctions';
import { sampleReserve } from '../dex/sampleData';

describe("AMM Functions", () => {

  test("addLiquidity should update reserves correctly", () => {
    addLiquidity({ tokenX: 100, tokenY: 200 });
    const addedReserve = getReserves();

    expect(addedReserve.tokenX).toBe(sampleReserve.tokenX + 100);
    expect(addedReserve.tokenY).toBe(sampleReserve.tokenY + 200);
  });

  test("removeLiquidity should update reserves correctly", () => {
    const liquidityToRemove = { proportion: 0.1 }; // Removing 10%
    const { removedAmount } = removeLiquidity(liquidityToRemove);
    const updatedReserve = getReserves();

    expect(updatedReserve.tokenX).toBeCloseTo(sampleReserve.tokenX * 0.9);
    expect(updatedReserve.tokenY).toBeCloseTo(sampleReserve.tokenY * 0.9);
    // Additional checks for amounts returned can be added.
  });

  test("swap should update reserves and maintain invariant", () => {
    const amountToRemove = 50; // Example value
    const { addedAmount} = swap('tokenX', amountToRemove);
    const updatedReserve = getReserves();

    // Based on the AMM invariant, check the resulting reserve after swap.
    const invariantBefore = sampleReserve.tokenX * sampleReserve.tokenY;
    const invariantAfter = updatedReserve.tokenX * updatedReserve.tokenY;

    expect(invariantBefore).toBeCloseTo(invariantAfter);
    // Additional checks based on swap logic, e.g., check outputAmount is correct.
  });

  // ... add more tests as needed.
});


import { Reserve, Liquidity } from './dexModels';

let currentReserve: Reserve = { tokenX: 1000, tokenY: 2000 }; // Initialize with some values

function addLiquidity(amountToAdd: Reserve): void {
    currentReserve = {
        tokenX: currentReserve.tokenX + amountToAdd.tokenX,
        tokenY: currentReserve.tokenY + amountToAdd.tokenY
    };
}

function removeLiquidity(liquidity: Liquidity): { removedAmount: Reserve } {
    const removedTokenX = currentReserve.tokenX * liquidity.proportion;
    const removedTokenY = currentReserve.tokenY * liquidity.proportion;
  
    currentReserve = {
        tokenX: currentReserve.tokenX - removedTokenX,
        tokenY: currentReserve.tokenY - removedTokenY
    };

    return {
      removedAmount: { tokenX: removedTokenX, tokenY: removedTokenY }
    };
}

function swap(tokenToRemove: 'tokenX' | 'tokenY', amountToRemove: number): { addedAmount: number } {
    const invariant = currentReserve.tokenX * currentReserve.tokenY;
    let newTokenX: number;
    let newTokenY: number;
  
    if (tokenToRemove === 'tokenX') {
        newTokenX = currentReserve.tokenX - amountToRemove;
        newTokenY = invariant / newTokenX;
        currentReserve = {
            tokenX: newTokenX,
            tokenY: newTokenY
        };
        return {
            addedAmount: currentReserve.tokenY - newTokenY
        };
    } else {
        newTokenY = currentReserve.tokenY - amountToRemove;
        newTokenX = invariant / newTokenY;
        currentReserve = {
            tokenX: newTokenX,
            tokenY: newTokenY
        };
        return {
            addedAmount: currentReserve.tokenX - newTokenX
        };
    }
}

function getReserves(): Reserve {
    return currentReserve;
}

export { addLiquidity, removeLiquidity, swap, getReserves };

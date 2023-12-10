import React, { useState } from 'react';
import './AMMDashboard.css'; // Ensure this path is correct and the file exists
import { AddLiquidityForm } from './AddLiquidityForm';
import { RemoveLiquidityForm } from './RemoveLiquidityForm';
import { SwapForm } from './SwapForm';
import { addLiquidity, removeLiquidity, swap, getReserves } from '../../dex/ammFunctions';

const AMMDashboard: React.FC = () => {
    const [reserves, setReserves] = useState(getReserves());

    const handleAddLiquidity = (tokenA: number, tokenB: number) => {
        addLiquidity({ tokenX: tokenA, tokenY: tokenB });
        setReserves(getReserves());
    };

    const handleRemoveLiquidity = (proportion: number) => {
        removeLiquidity({ proportion });
        setReserves(getReserves());
    };

    const handleSwap = (tokenToRemove: 'tokenX' | 'tokenY', amountToRemove: number) => {
        swap(tokenToRemove, amountToRemove);
        setReserves(getReserves());
    };

    return (
        <div>
            <h2>AMM Dashboard</h2>
            <AddLiquidityForm onAddLiquidity={handleAddLiquidity} />
            <RemoveLiquidityForm onRemoveLiquidity={handleRemoveLiquidity} />
            <SwapForm onSwap={handleSwap} />
            <div>
                <h3>Reserves</h3>
                <p>Token X: {reserves.tokenX}</p>
                <p>Token Y: {reserves.tokenY}</p>
            </div>
        </div>
    );
};

export { AMMDashboard };

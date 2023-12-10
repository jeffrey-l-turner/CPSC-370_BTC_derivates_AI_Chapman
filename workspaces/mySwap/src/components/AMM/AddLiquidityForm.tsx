import React, { useState } from 'react';

interface AddLiquidityFormProps {
    onAddLiquidity: (tokenA: number, tokenB: number) => void;
}

const AddLiquidityForm: React.FC<AddLiquidityFormProps> = ({ onAddLiquidity }) => {
    const [tokenA, setTokenA] = useState<string>('');
    const [tokenB, setTokenB] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddLiquidity(parseFloat(tokenA), parseFloat(tokenB));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Token A:
                    <input type="number" value={tokenA} onChange={e => setTokenA(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Token B:
                    <input type="number" value={tokenB} onChange={e => setTokenB(e.target.value)} required />
                </label>
            </div>
            <button type="submit">Add Liquidity</button>
        </form>
    );
};

export { AddLiquidityForm };

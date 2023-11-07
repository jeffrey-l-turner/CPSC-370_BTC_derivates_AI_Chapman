import React, { useState } from 'react';

interface SwapFormProps {
    onSwap: (tokenToRemove: 'tokenX' | 'tokenY', amountToRemove: number) => void;
}

const SwapForm: React.FC<SwapFormProps> = ({ onSwap }) => {
    const [tokenToRemove, setTokenToRemove] = useState<'tokenX' | 'tokenY'>('tokenX');
    const [amountToRemove, setAmountToRemove] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSwap(tokenToRemove, parseFloat(amountToRemove));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Token to remove:
                    <select value={tokenToRemove} onChange={e => setTokenToRemove(e.target.value as 'tokenX' | 'tokenY')}>
                        <option value="tokenX">Token X</option>
                        <option value="tokenY">Token Y</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Amount to remove:
                    <input type="number" value={amountToRemove} onChange={e => setAmountToRemove(e.target.value)} required />
                </label>
            </div>
            <button type="submit">Swap</button>
        </form>
    );
};

export { SwapForm };

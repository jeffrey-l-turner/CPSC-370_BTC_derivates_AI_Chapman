import React, { useState } from 'react';

interface RemoveLiquidityFormProps {
    onRemoveLiquidity: (proportion: number) => void;
}

const RemoveLiquidityForm: React.FC<RemoveLiquidityFormProps> = ({ onRemoveLiquidity }) => {
    const [proportion, setProportion] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRemoveLiquidity(parseFloat(proportion));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Proportion to remove:
                    <input type="number" value={proportion} onChange={e => setProportion(e.target.value)} required />
                </label>
            </div>
            <button type="submit">Remove Liquidity</button>
        </form>
    );
};

export { RemoveLiquidityForm };

import React, { useState } from 'react';
import { Order } from '../../dex/dexModels';

interface OrderInputFormProps {
    onPlaceOrder: (order: Order) => void;
}

const OrderInputForm: React.FC<OrderInputFormProps> = ({ onPlaceOrder }) => {
    const [type, setType] = useState<'BUY' | 'SELL'>('BUY');
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPlaceOrder({
            id: Date.now().toString(), // Simple ID based on timestamp. Consider using a library for unique IDs in a real app.
            type,
            price: parseFloat(price),
            quantity: parseFloat(quantity)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Type:
                    <select value={type} onChange={e => setType(e.target.value as 'BUY' | 'SELL')}>
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Price:
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Quantity:
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
                </label>
            </div>
            <button type="submit">Place Order</button>
        </form>
    );
};

export { OrderInputForm };

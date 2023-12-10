import React from 'react';
import { Order } from '../../dex/dexModels';
import './CLOBDashboard.css'

interface OrderBookDisplayProps {
    orderBook: Order[];
}

const OrderBookDisplay: React.FC<OrderBookDisplayProps> = ({ orderBook }) => {
    return (
        <table className="order-book-display">
            <thead>
                <tr>
                    <th>Type</th>
                </tr>
                <tr>
                    <th>Price</th>
                </tr>
                <tr>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {orderBook.map(order => (
                    <tr key={order.id}>
                        <td>{order.type}</td>
                        <td>{order.price}</td>
                        <td>{order.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export { OrderBookDisplay };

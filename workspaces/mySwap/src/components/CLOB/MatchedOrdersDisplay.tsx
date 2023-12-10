import React from 'react';
import { Order } from '../../dex/dexModels';

interface MatchedOrdersDisplayProps {
    matchedOrders: Order[];
}

const MatchedOrdersDisplay: React.FC<MatchedOrdersDisplayProps> = ({ matchedOrders }) => {
    return (
        <table>
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
                {matchedOrders.map(order => (
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

export default MatchedOrdersDisplay;

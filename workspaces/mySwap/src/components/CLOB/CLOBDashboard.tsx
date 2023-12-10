import React, { useState } from 'react';
import { OrderInputForm } from './OrderInputForm';
import { OrderBookDisplay } from './OrderBookDisplay';
import MatchedOrdersDisplay from './MatchedOrdersDisplay';
import { Order, OrderBook } from '../../dex/dexModels';
import { placeOrder, cancelOrder, matchOrders } from '../../dex/clobFunctions';
import './CLOBDashboard.css';

const CLOBDashboard: React.FC = () => {
    const [orderBook, setOrderBook] = useState<OrderBook>([]); // Start with an empty order book
    const [matchedOrders, setMatchedOrders] = useState<Order[]>([]);

    const handlePlaceOrder = (order: Order) => {
        const newOrderBook = placeOrder(order, orderBook);
        const result = matchOrders(newOrderBook);

        setOrderBook(result.updatedOrderBook);
        setMatchedOrders(prev => [...prev, ...result.matchedOrders]);
    };

    return (
        <div>
            <h2>CLOB Dashboard</h2>

            {/* Order Input Form */}
            <OrderInputForm onPlaceOrder={handlePlaceOrder} />

            {/* Order Book Display */}
            <h3>Order Book</h3>
            <OrderBookDisplay orderBook={orderBook} />

            {/* Matched Orders Display */}
            {matchedOrders.length > 0 && (
                <>
                    <h3>Matched Orders</h3>
                    <MatchedOrdersDisplay matchedOrders={matchedOrders} />
                </>
            )}
        </div>
    );
};

export { CLOBDashboard };

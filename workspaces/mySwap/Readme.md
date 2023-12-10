# Decentralized Exchange Emulation Using Functional Programming

This project is an emulation of a decentralized exchange (DEX) using functional programming. It contrasts the difference between a central limit order book (CLOB) approach and an automated market maker (AMM) approach.

## Central Limit Order Book (CLOB):

- `placeOrder`: This function accepts an order (Order) and an order book (OrderBook) as arguments. It returns a new order book with the new order added in the appropriate position, maintaining the order from highest to lowest price.
- `cancelOrder`: This function accepts an id and an order book (OrderBook) as arguments. It returns a new order book with the order with the matching id removed.
- `matchOrders`: This function accepts an order book (OrderBook) as an argument. It returns a new order book with any matched buy and sell orders with the same price removed. It also returns the matched orders.

## Automated Market Maker (AMM):

- `addLiquidity`: This function accepts an amount of each token (Reserve) and the current reserve (Reserve). It returns a new reserve with the amounts of each token increased by the appropriate amount.
- `removeLiquidity`: This function accepts a proportion of liquidity to remove (Liquidity) and the current reserve (Reserve). It returns a new reserve with the amount of each token decreased by the appropriate amount, and the amounts removed.
- `swap`: This function accepts a token to remove from the reserve, the amount to remove, and the current reserve (Reserve). It returns a new reserve with the amount of the input token decreased by the specified amount and the amount of the other token increased by the calculated amount. It also returns the calculated amount of the other token.

Remember to maintain the invariant for AMM: x*y=k, where x and y are the amounts of the two tokens in the reserve and k is a constant.

Note: This exercise is designed to illustrate the basic concepts of a CLOB and an AMM in a DEX. In a real-world scenario, additional considerations such as transaction fees, price slippage, user balances, and smart contract interactions would need to be taken into account.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

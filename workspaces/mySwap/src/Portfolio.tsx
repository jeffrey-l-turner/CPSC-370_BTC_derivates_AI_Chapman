import React from "react";

interface PortfolioProps {
  // Props for the portfolio component
}

const Portfolio: React.FC<PortfolioProps> = () => {
  return (
    <div className="uniswap-portfolio">
      <h2>Your Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ETH</td>
            <td>10.000000</td>
            <td>$500.00</td>
          </tr>
          <tr>
            <td>DAI</td>
            <td>1000.000000</td>
            <td>$1000.00</td>
          </tr>
          <tr>
            <td>USDC</td>
            <td>1000.000000</td>
            <td>$1000.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { Portfolio };

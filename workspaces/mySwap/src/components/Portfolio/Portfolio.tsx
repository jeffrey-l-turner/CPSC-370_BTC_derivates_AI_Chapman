import React from "react";
import './Portfolio.css';

interface PortfolioProps {
  portfolio: { [key: string]: { balance: number; value: number } };
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  return (
    <div className="portfolio">
      <h2 className="portfolio-title">Portfolio</h2>
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(portfolio).map(([token, { balance, value }]) => (
            <tr key={token}>
              <td>{token}</td>
              <td>{Number(balance.toFixed(2)).toLocaleString()}</td>
              <td>${Number(value.toFixed(2)).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Portfolio };

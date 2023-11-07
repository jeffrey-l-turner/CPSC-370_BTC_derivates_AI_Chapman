import React from "react";
import './ConversionRates.css';

interface ConversionRatesProps {
  // No props needed for this component
}

const ConversionRates: React.FC<ConversionRatesProps> = () => {
  // Conversion rates
  const conversionRates = {
    ETH: { ETH: 1, DAI: 2000, USDC: 2000 },
    DAI: { ETH: 0.0005, DAI: 1, USDC: 1 },
    USDC: { ETH: 0.0005, DAI: 1, USDC: 1 },
  };

  return (
    <div className="conversion-rates">
      <h2 className="conversion-rates-title">Conversion Rates</h2>
      <table className="conversion-rates-table">
        <thead>
          <tr>
            <th></th>
            {Object.keys(conversionRates).map((token) => (
              <th key={token}>{token}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(conversionRates).map(([token, rates]) => (
            <tr key={token}>
              <td>{token}</td>
              {Object.entries(rates).map(([toToken, rate]) => (
                <td key={toToken}>{rate}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ConversionRates };

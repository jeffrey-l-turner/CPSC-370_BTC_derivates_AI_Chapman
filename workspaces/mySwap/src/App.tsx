import React, { useState } from 'react';
import './App.css';
import { Header } from './Header.tsx';
import { Navigation } from './Navigation.tsx';
import { Portfolio } from './Portfolio.tsx';
import { SwapForm } from './SwapForm.tsx';
import { ConversionRates } from './ConversionRates.tsx';

const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState({
    ETH: { balance: 10, value: 500 },
    DAI: { balance: 1000, value: 1000 },
    USDC: { balance: 1000, value: 1000 },
  });

  return (
    <div className="app">
      <Header />
      <Navigation />
      <main className="main-content">
        <div className="swap-portfolio-container">
          <SwapForm portfolio={portfolio} setPortfolio={setPortfolio} />
          <Portfolio portfolio={portfolio} />
          <ConversionRates />
        </div>
      </main>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Navigation } from './components/Navigation/Navigation';
import { Portfolio } from './components/Portfolio/Portfolio';
import { SwapForm } from './components/SwapForm/SwapForm';
import { ConversionRates } from './components/ConversionRates/ConversionRates';
import { CLOBDashboard } from './components/CLOB/CLOBDashboard';
import { AMMDashboard } from './components/AMM/AMMDashboard';

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
        <div className="dashboard-container">
          <div className='amm-dashboard-container'>
            <AMMDashboard />
          </div>
          <div className='clob-dashboard-container'>
            <CLOBDashboard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

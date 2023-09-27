import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Portfolio from './Portfolio';
import SwapForm from './SwapForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <SwapForm />
      <Portfolio />
    </div>
  );
};

export default App;

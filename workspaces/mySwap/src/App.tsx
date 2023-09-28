import React from 'react';
import { Header } from './Header.tsx';
import { Navigation } from './Navigation.tsx';
import { Portfolio } from './Portfolio.tsx';
import { SwapForm } from './SwapForm.tsx';

const App: React.FC = () => {
  return (
    <div>
    <div className="App">
      <Header />
      <Navigation />
      <SwapForm />
      <Portfolio />
      <Portfolio />
    </div>
    </div>
    <span>
      <p>Hello World</p>
    </span>
    </div>
  );
};

export default App;

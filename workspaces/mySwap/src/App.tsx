import React from 'react';
import { Header } from './Header.tsx';
import { Navigation } from './Navigation.tsx';
import { Portfolio } from './Portfolio.tsx';
import { SwapForm } from './SwapForm.tsx';

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
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello, world!</h1>
    </div>
  );
};

export default App;

import React from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx'; /* New component */
import PortfolioPreview from './components/PortfolioPreview.tsx'; /* New component */
import Testimonials from './components/Testimonials.tsx'; /* New component */
import Footer from './components/Footer.tsx'; /* New component */

const App = ({ provider }) => {
  return (
    <div>
      <Header />
      <Hero />
      <PortfolioPreview />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;

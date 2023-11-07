import React from "react";
import './Navigation.css';

interface NavigationProps {
  // No props needed for this component
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <nav className="navigation">
      <button className="navigation-button">Swap</button>
      <button className="navigation-button">Pool</button>
      <button className="navigation-button">Analytics</button>
      <button className="navigation-button">Docs</button>
    </nav>
  );
};

export { Navigation };

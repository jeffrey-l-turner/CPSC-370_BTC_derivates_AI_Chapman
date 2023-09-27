import React from "react";

interface NavigationProps {
  // No props needed for this component
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <nav className="uniswap-navigation">
      <a href="#">Swap</a>
      <a href="#">Pool</a>
      <a href="#">Analytics</a>
      <a href="#">Docs</a>
    </nav>
  );
};

export { Navigation };

import React from "react";

interface NavigationProps {
  // No props needed for this component
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <nav className="uniswap-navigation">
      <a href="javascript:void(0)">Swap</a>
      <a href="javascript:void(0)">Pool</a>
      <a href="javascript:void(0)">Analytics</a>
      <a href="javascript:void(0)">Docs</a>
    </nav>
  );
};

export { Navigation };

import React from "react";
import logo from "./chapman_class_logo.svg";

interface HeaderProps {
  // No props needed for this component
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="uniswap-header">
      <img src="./chapman_class_logo.svg" alt="Chapman class logo" />
      <h1>MySwap</h1>
    </header>
  );
};

export { Header };

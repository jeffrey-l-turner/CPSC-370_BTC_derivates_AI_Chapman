import React from "react";
import logo from "../public/logo.svg";

interface HeaderProps {
  // No props needed for this component
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="uniswap-header">
      <img src={logo} alt="Uniswap logo" />
      <h1>Uniswap</h1>
    </header>
  );
};

export default Header;

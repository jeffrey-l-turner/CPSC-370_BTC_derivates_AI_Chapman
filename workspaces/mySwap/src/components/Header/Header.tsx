import React from "react";
import './Header.css';
import logo from '../../assets/chapman_panther.png';

interface HeaderProps {
  // No props needed for this component
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header">
      <img src={logo} alt="MySwap Logo" className="header-logo" />
      <h1 className="header-title">MySwap</h1>
    </header>
  );
};

export { Header };

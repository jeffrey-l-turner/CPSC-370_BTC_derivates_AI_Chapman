import React from "react";
import logo from "./chapman_panther.png";

interface HeaderProps {
  // No props needed for this component
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="uniswap-header">
      <img src={logo} alt="Chapman class logo" />
      <select>
        <option value="swap1">Swap 1</option>
        <option value="swap2">Swap 2</option>
        <option value="swap3">Swap 3</option>
      </select>
    </header>
  );
};

export { Header };

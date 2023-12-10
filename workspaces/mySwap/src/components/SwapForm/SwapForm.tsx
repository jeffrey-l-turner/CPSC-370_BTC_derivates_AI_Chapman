import React, { useState } from "react";
import './SwapForm.css';

interface SwapFormProps {
  portfolio: { [key: string]: { balance: number; value: number } };
  setPortfolio: React.Dispatch<
    React.SetStateAction<{ [key: string]: { balance: number; value: number } }>
  >;
}

const SwapForm: React.FC<SwapFormProps> = ({ portfolio, setPortfolio }) => {
  const [from, setFrom] = useState("ETH");
  const [to, setTo] = useState("DAI");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Conversion rates
    const conversionRates = {
      ETH: { DAI: 2000, USDC: 2000 },
      DAI: { ETH: 0.0005, USDC: 1 },
      USDC: { ETH: 0.0005, DAI: 1 },
    };

    // Calculate the amount to be received after the swap
    const receivedAmount = amount * conversionRates[from][to];

    // Update the portfolio
    setPortfolio((prevPortfolio) => {
      const newPortfolio = { ...prevPortfolio };
      newPortfolio[from].balance -= amount;
      newPortfolio[from].value -= amount * newPortfolio[from].value / newPortfolio[from].balance;
      newPortfolio[to].balance += receivedAmount;
      newPortfolio[to].value += receivedAmount * newPortfolio[to].value / newPortfolio[to].balance;
      return newPortfolio;
    });
  };
  return (
    <form className="swap-form" onSubmit={handleSubmit}>
      <label htmlFor="from">
        From:
        <select name="from" id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="ETH">ETH</option>
          <option value="DAI">DAI</option>
          <option value="USDC">USDC</option>
        </select>
      </label>
      <label htmlFor="to">
        To:
        <select name="to" id="to" value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="ETH">ETH</option>
          <option value="DAI">DAI</option>
          <option value="USDC">USDC</option>
        </select>
      </label>
      <label htmlFor="amount">
        Amount:
        <input type="text" id="amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value === "" ? 0 : Number(e.target.value))} />
      </label>
      <button type="submit" className="swap-button">Swap</button>
    </form>
  );
};

export { SwapForm };

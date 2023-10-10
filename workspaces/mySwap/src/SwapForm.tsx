import React from "react";

interface SwapFormProps {
  // Props for the swap form
}

const SwapForm: React.FC<SwapFormProps> = () => {
  return (
    <form className="uniswap-swap-form">
      <input type="text" placeholder="From" />
      <input type="text" placeholder="To" />
      <input type="number" placeholder="Amount" />
      <button type="submit">Swap</button>
    </form>
  );
};

export { SwapForm };

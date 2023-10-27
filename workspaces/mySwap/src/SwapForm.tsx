import React, { useState } from "react";
import { swap, Reserve } from "./orders.ts";

interface SwapFormProps {
	// Props for the swap form (e.g., initial reserves, onSwap callback, etc.)
	currentReserve: Reserve; // Initial reserve for the AMM
	onSwap: (newReserve: Reserve) => void; // Callback after successful swap
}

const SwapForm: React.FC<SwapFormProps> = ({ currentReserve, onSwap }) => {
	const [fromToken, setFromToken] = useState("");
	const [toToken, setToToken] = useState("");
	const [amount, setAmount] = useState<number | null>(null);

	const handleSwap = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Here, we're assuming swapping from tokenX to tokenY for simplicity.
		// You may need to adjust based on your requirements.
		const isTokenX = fromToken === "tokenX" && toToken === "tokenY";

		if (amount !== null) {
			const result = swap(isTokenX, amount, currentReserve);
			onSwap(result.newReserve);
			alert(`Received amount: ${result.receivedAmount}`);
		} else {
			alert("Please specify the amount!");
		}
	};

	return (
		<form className="uniswap-swap-form" onSubmit={handleSwap}>
			<input type="text" placeholder="From" value={fromToken} onChange={(e) => setFromToken(e.target.value)} />
			<input type="text" placeholder="To" value={toToken} onChange={(e) => setToToken(e.target.value)} />
			<input type="number" placeholder="Amount" onChange={(e) => setAmount(parseFloat(e.target.value))} />
			<button type="submit">Swap</button>
		</form>
	);
};

export { SwapForm };

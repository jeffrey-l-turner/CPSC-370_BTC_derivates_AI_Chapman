import React from "react";

interface HeaderProps {
	// No props needed for this component
}

const Header: React.FC<HeaderProps> = () => {
	return (
		<header className="uniswap-header">
			<img src="/logo.png" alt="Chapman logo" />
			<h1>MySwap</h1>
		</header>
	);
};

export { Header };

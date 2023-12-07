import React from "react";
import "./Navigation.css";

interface NavigationProps {
	// No props needed for this component
}

const Navigation: React.FC<NavigationProps> = () => {
	return (
		<nav className="uniswap-navigation">
			<button className="link-button">Swap</button>
			<button className="link-button">Pool</button>
			<button className="link-button">Analytics</button>
			<button className="link-button">Docs</button>
		</nav>
	);
};

export { Navigation };

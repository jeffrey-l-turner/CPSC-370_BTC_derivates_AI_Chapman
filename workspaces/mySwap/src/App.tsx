import React from "react";
import { Header } from "./Header.tsx";
import { Navigation } from "./Navigation.tsx";
import { Portfolio } from "./Portfolio.tsx";
import { SwapForm } from "./SwapForm.tsx";
import "./App.css";

const App: React.FC = () => {
	return (
		<div className="App">
			<Header />
			<Navigation />
			<SwapForm />
			<Portfolio />
		</div>
	);
};

export default App;

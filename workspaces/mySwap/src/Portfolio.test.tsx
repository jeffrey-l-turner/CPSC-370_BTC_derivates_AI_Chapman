import React from "react";
import { render, screen } from "@testing-library/react";
import { compose } from "ramda";
import { Portfolio } from "./Portfolio";

test("renders portfolio", () => {
	const renderPortfolioAndCheckTable = compose(
		(tableElement) => expect(tableElement).toBeInTheDocument(),
		() => screen.getByText(/Your Portfolio/i),
		() => render(<Portfolio />)
	);

	renderPortfolioAndCheckTable();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { compose } from "ramda";
import { SwapForm } from "./SwapForm";

test("renders swap form", () => {
	const renderSwapFormAndCheckInput = compose(
		(inputElement) => expect(inputElement).toBeInTheDocument(),
		() => screen.getByPlaceholderText(/From/i),
		() => render(<SwapForm />)
	);

	renderSwapFormAndCheckInput();
});

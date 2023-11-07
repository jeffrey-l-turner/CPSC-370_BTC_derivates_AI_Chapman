import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SwapForm } from './SwapForm';

test('renders SwapForm and updates portfolio on submit', () => {
  const portfolio = {
    ETH: { balance: 10, value: 500 },
    DAI: { balance: 1000, value: 1000 },
    USDC: { balance: 1000, value: 1000 },
  };
  const setPortfolio = jest.fn();

  const { getByLabelText, getByText } = render(<SwapForm portfolio={portfolio} setPortfolio={setPortfolio} />);

  const fromInput = getByLabelText('From:');
  const toInput = getByLabelText('To:');
  const amountInput = getByLabelText('Amount:');
  const swapButton = getByText('Swap');

  fireEvent.change(fromInput, { target: { value: 'ETH' } });
  fireEvent.change(toInput, { target: { value: 'DAI' } });
  fireEvent.change(amountInput, { target: { value: '5' } });
  fireEvent.click(swapButton);

  expect(setPortfolio).toHaveBeenCalled();
});

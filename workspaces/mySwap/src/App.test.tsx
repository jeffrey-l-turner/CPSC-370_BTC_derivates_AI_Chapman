import React from 'react';
import { render, screen } from '@testing-library/react';
import { compose } from 'ramda';
import App from './App';

test('renders learn react link', () => {
  const renderAppAndCheckHeader = compose(
    (headerElement: any) => expect(headerElement).toBeInTheDocument(),
    () => screen.getByText(/MySwap/i),
    () => render(<App />)
  );

  renderAppAndCheckHeader();
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText(/SwapForm/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
  });
});

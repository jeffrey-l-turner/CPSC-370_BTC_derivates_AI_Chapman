import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders logo', () => {
  render(<Header />);
  const logoElement = screen.getByAltText(/Uniswap logo/i);
  expect(logoElement).toBeInTheDocument();
});

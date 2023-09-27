import React from 'react';
import { render, screen } from '@testing-library/react';
import { compose } from 'ramda';
import { Header } from './Header';

test('renders logo', () => {
  const renderHeaderAndCheckLogo = compose(
    (logoElement) => expect(logoElement).toBeInTheDocument(),
    () => screen.getByAltText(/Uniswap logo/i),
    () => render(<Header />)
  );

  renderHeaderAndCheckLogo();
});

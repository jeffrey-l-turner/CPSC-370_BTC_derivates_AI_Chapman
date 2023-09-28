import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';

test('Navigation component has no anchor tags without href', () => {
  render(<Navigation />);
  const linkElements = screen.queryAllByRole('link');
  expect(linkElements).toHaveLength(0);
});

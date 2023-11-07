import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';
import { compose, always, length, prop } from 'ramda';

test('Navigation component has no anchor tags without href', () => {
  render(<Navigation />);
  const getLinkElements = compose(always(0), length, prop('link'));
  const linkElements = getLinkElements(screen.queryAllByRole);
  expect(linkElements).toBe(0);
});

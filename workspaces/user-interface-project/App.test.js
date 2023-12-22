import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Replace './App' with the path to your App.js file

describe('App component', () => {
  it('renders the navigation bar with Home, About, and Contact links', () => {
    render(<App />);

    const navLinks = screen.getAllByRole('link');
    expect(navLinks).toHaveLength(3);
    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[1]).toHaveTextContent('About');
    expect(navLinks[2]).toHaveTextContent('Contact');
  });

  it('renders the header with the title "Welcome to MySwap"', () => {
    render(<App />);

    const headerTitle = screen.getByRole('heading');
    expect(headerTitle).toHaveTextContent('Welcome to MySwap');
  });

  it('renders two paragraphs in the main section', () => {
    render(<App />);

    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs).toHaveLength(2);
  });

  it('renders the footer with copyright information', () => {
    render(<App />);

    const footerText = screen.getByText(/© 2023 MySwap. All rights reserved./i);
    expect(footerText).toBeInTheDocument();
  });
});

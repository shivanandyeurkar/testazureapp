import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

import App from './App';
import history from './utils/history';

test('full app rendering/navigating', () => {
  render(<App />);
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/Login page/i)).toBeInTheDocument();
});

test('landing on a bad page', () => {
  history.push('/sda');
  render(<App />);
  expect(screen.getByText(/page 404/i)).toBeInTheDocument();
});

test('landing on dashboard page', () => {
  history.push('/dashboard');
  render(<App />);
  expect(screen.getByText(/Dashboard page/i)).toBeInTheDocument();
  const leftClick = { a: 0 };
  userEvent.click(screen.getByText(/Stats/i), leftClick);

  // check that the content changed to the new page
  expect(screen.getByText(/page 404/i)).toBeInTheDocument();
});

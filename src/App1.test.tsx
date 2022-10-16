import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import mockData from './__mock__/mock.json';
import userEvent from '@testing-library/user-event'

const unMockedFetch = window.fetch;

beforeAll(() => {
  jest.spyOn(window, 'fetch');
});

afterAll(() => {
  window.fetch = unMockedFetch;
});

test('use mock fetch to test', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    }),
  ) as jest.Mock;
  render(<App />);
  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('button', {name: /refresh/i}))

  await waitFor(() => {
    expect(screen.getAllByRole('listitem').length).toBe(5);
  });
});

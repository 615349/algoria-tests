import { rest } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import { setupServer } from 'msw/node';
import mockData from './__mock__/mock.json';
import { baseUrl } from './utils';

const handlers = [
  rest.get(baseUrl, (req, res, ctx) => {
    const tags = req.url.searchParams.get('tags');
    const perPage = req.url.searchParams.get('hitsPerPage');
    if (tags === 'story' && perPage === '5') {
      return res(ctx.json(mockData));
    } else {
      return res(ctx.json({ hits: [] }));
    }
  })
];

const server = setupServer(...handlers)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('use msw to test', async () => {
  render(<App />);
  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('button', {name: /refresh/i}))

  await waitFor(() => {
    expect(screen.getAllByRole('listitem').length).toBe(5);
  });
});
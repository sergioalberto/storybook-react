import { render, screen } from '@testing-library/react';
import App from './App';

test('renders task box page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tasks box/i);
  expect(linkElement).toBeInTheDocument();
});

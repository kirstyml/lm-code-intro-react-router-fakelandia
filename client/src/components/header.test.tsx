import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';

describe("<Header />", () => {
  test('renders the Fakelandia Justice Dept name', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    const titleElement = screen.getByText(/Fakelandia/i);
    expect(titleElement).toBeInTheDocument();
  });
});

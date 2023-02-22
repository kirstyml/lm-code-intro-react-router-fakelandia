import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './footer';

describe("<footer>", () => {
  test('renders the copyright owner', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    const titleElement = screen.getByText(/TechReturners/i);
    expect(titleElement).toBeInTheDocument();
  });
})

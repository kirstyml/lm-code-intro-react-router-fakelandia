import { render, screen } from '@testing-library/react';
import { Home } from './home_page';


test('renders the welcome text', () => {
    render(<Home />);
    const introElement = screen.getByText(/Welcome to the home/i);
    expect(introElement).toBeInTheDocument();
});
/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react';
 import { BrowserRouter } from 'react-router-dom';
 import { Home } from './home_page';
 
 
 test('renders the welcome text', () => {
   render(<BrowserRouter><Home /></BrowserRouter>);
   const introElement = screen.getByText(/Welcome to the home/i);
   expect(introElement).toBeInTheDocument();
 });
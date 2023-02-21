import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Confession } from './confession_page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

test('renders the intro text for the confession page', () => {
    render(<Confession />);
    const introElement = screen.getByText(/It's very difficult to catch people/i);
    expect(introElement).toBeInTheDocument();
});

test('Given the page has rendered, when there is no subject entered, then the submit button is disabled', () => {
    render(<Confession />);
    const submitButton = screen.getByRole('button') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
});

test('Given the page has rendered, when the user enters valid inputs, then the submit button becomes active', async () => {
    render(<Confession />);
    const input = screen.getAllByRole('textbox')[0];
    await userEvent.type(input, "Title");
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['vegetables']);
    const textArea = screen.getAllByRole('textbox')[1];
    await userEvent.type(textArea, "Details that are more than 20 characters long");
    const submitButton = screen.getByRole('button') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
});

test('Given the page has rendered, when the user first sees the form with the empty inputs, then error messages are not present', () => {
    render(<Confession />);
    const errorMessage = screen.queryByText(/Error/i);
    expect(errorMessage).not.toBeInTheDocument();
});

test('Given the page has rendered, when the user enters an invalid subject line, then an error message appears and the submit button is disabled', async () => {
    render(<Confession />);
    const input = screen.getAllByRole('textbox')[0];
    await userEvent.type(input, "Title");
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['vegetables']);
    const textArea = screen.getAllByRole('textbox')[1];
    await userEvent.type(textArea, "Details that are more than 20 characters long");
    await userEvent.clear(input);
    const submitButton = screen.getByRole('button') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const errorMessage = screen.queryByText(/Error/i);
    expect(errorMessage).toBeInTheDocument();
});

test('Given the page has rendered, when the user picks an invalid reason, then an error message appears and the submit button is disabled', async () => {
    render(<Confession />);
    const input = screen.getAllByRole('textbox')[0];
    await userEvent.type(input, "Title");
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['vegetables']);
    const textArea = screen.getAllByRole('textbox')[1];
    await userEvent.type(textArea, "Details that are more than 20 characters long");
    await userEvent.selectOptions(select, [""]);
    const submitButton = screen.getByRole('button') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const errorMessage = screen.queryByText(/Error/i);
    expect(errorMessage).toBeInTheDocument();
});

test('Given the page has rendered, when the user enters invalid details, then an error message appears and the submit button is disabled', async () => {
    render(<Confession />);
    const input = screen.getAllByRole('textbox')[0];
    await userEvent.type(input, "Title");
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['vegetables']);
    const textArea = screen.getAllByRole('textbox')[1];
    await userEvent.type(textArea, "Details that are more than 20 characters long");
    const submitButton = screen.getByRole('button') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
    const errorMessage = screen.queryByText(/Error/i);
    expect(errorMessage).not.toBeInTheDocument();
    await userEvent.clear(textArea);
    expect(submitButton.disabled).toBe(true);
    const errorMessageNext = screen.queryByText(/Error/i);
    expect(errorMessageNext).toBeInTheDocument();
});



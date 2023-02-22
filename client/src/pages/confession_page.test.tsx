import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Confession } from './confession_page';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<ConfessionPAge />", () => {
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

  test('given the user has entered valid inputs, when the user presses submit, the confession information is posted to the endpoint', async () => {
    server.use(
      rest.post('http://localhost:8080/api/confess', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          justTalked: false,
          message: "Confession received."
        }))
      }),
    );
    window.alert = jest.fn();
    render(<Confession />);
    const input = screen.getAllByRole('textbox')[0];
    await userEvent.type(input, "Title");
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['vegetables']);
    const textArea = screen.getAllByRole('textbox')[1];
    await userEvent.type(textArea, "Details that are more than 20 characters long");
    const submitButton = screen.getByRole('button') as HTMLButtonElement;
    await userEvent.click(submitButton);
    await waitFor(window.alert);
    expect(window.alert).toHaveBeenCalled();
  });


  test('given the user has entered valid inputs and submitted the form, when the endpoint returns a failure, the error message returned is displayed', async () => {
    server.use(
      rest.post('http://localhost:8080/api/confess', (req, res, ctx) => {
        return res(ctx.json({
          success: false,
          message: "Invalid confession."
        }))
      }),
    );
    render(<Confession />);
    const input = screen.getAllByRole('textbox')[0];
    await userEvent.type(input, "Title");
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['vegetables']);
    const textArea = screen.getAllByRole('textbox')[1];
    await userEvent.type(textArea, "Details that are more than 20 characters long");
    const submitButton = screen.getByRole('button') as HTMLButtonElement;
    await userEvent.click(submitButton);
    await waitFor(() => screen.findByText(/error:/i));
    expect(screen.getByText(/Details: Invalid Confession/i)).toBeInTheDocument();
  });

  //   test('given the user has succesfully submitted a confession, when the success message is received, the confession information is added to the misdemeanours', async () => {
  //     server.use(
  //       rest.post('http://localhost:8080/api/confess', (req, res, ctx) => {
  //         return res(ctx.json({
  //             success: true,
  //             justTalked: false,
  //             message: "Confession received."
  //         }))
  //       }),
  //     );
  //     window.alert = jest.fn();
  //     const addMisdemeanour = jest.fn(x => x);
  //     render(<MisdemeanoursContext.Provider value={{misdemeanours: [], punishments: [], addMisdemeanour}}><Confession /></MisdemeanoursContext.Provider>);
  //     const input = screen.getAllByRole('textbox')[0];
  //     await userEvent.type(input, "Title");
  //     const select = screen.getByRole('combobox');
  //     await userEvent.selectOptions(select, ['vegetables']);
  //     const textArea = screen.getAllByRole('textbox')[1];
  //     await userEvent.type(textArea, "Details that are more than 20 characters long");
  //     const submitButton = screen.getByRole('button') as HTMLButtonElement;
  //     await userEvent.click(submitButton);
  //     expect(addMisdemeanour).toBeCalledTimes(1);
  //     expect(addMisdemeanour).toBeCalledWith("vegetables");
  //   });
})



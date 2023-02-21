import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetailsTextArea } from './detailsTextArea';

test('given the required props, when the component is rendered, it displays the value', async () => {
    const handleChange = jest.fn(e => e.target.value);
    render(<DetailsTextArea detailsText={'hello'} handleChange={handleChange} />);
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(input.value).toBe("hello");
    expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
  });

test('given the input has rendered, when a user types in the input, then the handleChange function is called', async () => {
  const handleChange = jest.fn(e => e.target.value);
  render(<DetailsTextArea detailsText={""} handleChange={handleChange} />);
  const input = screen.getByRole('textbox');
  await userEvent.type(input, "Hello")
  expect(handleChange).toHaveBeenCalledTimes(5);
  expect(handleChange).toHaveLastReturnedWith('o');
});
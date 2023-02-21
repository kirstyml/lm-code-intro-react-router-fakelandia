import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReasonsSelect } from './reasonsSelect';

test('given the required props, when the component is rendered, it displays the value', async () => {
    const handleChange = jest.fn(e => e.target.value);
    render(<ReasonsSelect selectedReason={""} handleChange={handleChange} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect((screen.getByText("--Please select an option--") as HTMLOptionElement).selected).toBe(true);
    expect((screen.getByText("vegetables") as HTMLOptionElement).selected).toBe(false);
  });

test('given the select has rendered, when a user selects an option, then the handleChange function is called', async () => {
  const handleChange = jest.fn(e => e.target.value);
  render(<ReasonsSelect selectedReason={""} handleChange={handleChange} />);
  const select = screen.getByRole('combobox');
  await userEvent.selectOptions(select, ['vegetables']);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveReturnedWith('vegetables');
});
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubjectInput } from "./subjectInput";

describe("<SubjectInput>", () => {
  test("given the required props, when the component is rendered, it displays the value", async () => {
    const handleChange = jest.fn((x) => x);
    render(
      <SubjectInput
        inputValue={"Subject name"}
        handleChange={handleChange}
        error={undefined}
        touched={false}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Subject name");
    expect(screen.getByDisplayValue("Subject name")).toBeInTheDocument();
  });

  test("given the input has rendered, when a user types in the input, then the handleChange function is called", async () => {
    const handleChange = jest.fn((x) => x);
    render(
      <SubjectInput
        inputValue={""}
        handleChange={handleChange}
        error={undefined}
        touched={false}
      />
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Title");
    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(handleChange).toHaveLastReturnedWith("e");
  });
});

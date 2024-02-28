import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("<Button />", () => {
  it("renders with correct text", () => {
    render(<Button text="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with correct button type", () => {
    render(<Button text="Submit" type="submit" />);
    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders with disabled attribute", () => {
    render(<Button text="Disabled Button" disabled />);
    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
  });

  it("executes onClick function when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button text="Clickable" onClick={onClickMock} />);
    fireEvent.click(screen.getByText("Clickable"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders with custom class", () => {
    render(<Button text="Custom Class" classname="custom-class" />);
    const button = screen.getByText("Custom Class");
    expect(button).toHaveClass("custom-class");
  });

  it("renders with background subtype", () => {
    render(<Button text="With Background Subtype" backgroundSubtype="active" />);
    const button = screen.getByText("With Background Subtype");
    expect(button).toHaveAttribute("data-subtype", "active");
  });

  it("renders with button type", () => {
    render(<Button text="With Button Type" buttonType="secondary" />);
    const button = screen.getByText("With Button Type");
    expect(button).toHaveAttribute("data-buttontype", "secondary");
  });
});

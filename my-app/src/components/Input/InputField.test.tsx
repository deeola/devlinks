import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";

describe("<InputField />", () => {
  it("renders input with provided props", () => {
    render(
      <InputField
        id="test-id"
        name="test-name"
        value="test-value"
        onChange={() => {}}
        placeholder="Test Placeholder"
        type="text"
      />
    );

    const inputElement = screen.getByPlaceholderText("Test Placeholder");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("id", "test-id");
    expect(inputElement).toHaveAttribute("name", "test-name");
    expect(inputElement).toHaveValue("test-value");
  });

  it("calls onChange callback when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <InputField
        id="test-id"
        name="test-name"
        value=""
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders error message when error prop is provided", () => {
    render(
      <InputField
        id="test-id"
        name="test-name"
        value=""
        onChange={() => {}}
        error
        errorMessage="This field is required"
      />
    );

    const errorElement = screen.getByText("This field is required");
    expect(errorElement).toBeInTheDocument();
  });

  it("applies error styles when error prop is true", () => {
    render(
      <InputField
        id="test-id"
        name="test-name"
        value=""
        onChange={() => {}}
        error
      />
    );

    const inputContainer = screen.getByTestId("input-container");
    expect(inputContainer).toHaveClass("error");
  });
});

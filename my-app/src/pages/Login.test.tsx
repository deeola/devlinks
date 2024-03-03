import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,

} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../state/api/apiSlice";

afterEach(cleanup);

const MockApp = () => {
  return (
    <AuthProvider>
      <ApiProvider api={apiSlice}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  );
};

describe("<Login />", () => {
  it("renders login form with input fields and button", async () => {
    render(<MockApp />);
    const emailInput = screen.getByPlaceholderText("e.g. alex@email.com");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByTestId("login-button");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("allows user to fill in and submit form", async () => {
    render(<MockApp />);

    const emailInput = screen.getByPlaceholderText("e.g. alex@email.com");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByTestId("login-button");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");

    fireEvent.click(loginButton);

    const submittedEmailInput = await screen.findByDisplayValue(
      "test@example.com"
    );
    const submittedPasswordInput = await screen.findByDisplayValue(
      "password123"
    );

    expect(submittedEmailInput).toBeInTheDocument();
    expect(submittedPasswordInput).toBeInTheDocument();
  });

  test("displays error messages if email is not entered", async () => {
    render(<MockApp />);

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByTestId("login-button");

    userEvent.type(passwordInput, "12345678");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  test("displays error messages if password is null", async () => {
    render(<MockApp />);

    const emailInput = screen.getByPlaceholderText("e.g. alex@email.com");
    const loginButton = screen.getByTestId("login-button");

    userEvent.type(emailInput, "test@example.com");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  test("displays error messages if password is less than 8 characters", async () => {
    render(<MockApp />);

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByTestId("login-button");

    userEvent.type(passwordInput, "1234567");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long")
      ).toBeInTheDocument();
    });
  });

  test("toggles password visibility", () => {
    render(<MockApp />);

    const passwordInput = screen.getByTestId("password-input");
    const passwordToggle = screen.getByTestId("password-toggle");

    expect(passwordInput.getAttribute("type")).toBe("password");

    fireEvent.click(passwordToggle);

    expect(passwordInput.getAttribute("type")).toBe("text");
  });

  test('allows user to toggle "Trust this device" checkbox', () => {
    render(<MockApp />);

    const persistCheckbox = screen.getByLabelText(
      "Trust this device"
    ) as HTMLInputElement;

    fireEvent.click(persistCheckbox);

    expect(persistCheckbox.checked).toBe(true);
  });



});

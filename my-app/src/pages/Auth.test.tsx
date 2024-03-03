import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "./Auth";
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
          <Auth />
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  );
};

describe("<Register />", () => {
  it("renders registration form with input fields and button", async () => {
    render(<MockApp />);
    const emailInput = screen.getByPlaceholderText("e.g. alex@email.com");
    const passwordInput = screen.getByPlaceholderText("At least 8 characters");
    const passwordMatchInput = screen.getByPlaceholderText(
      "Enter your password again"
    );
    const registerButton = screen.getByTestId("register-button");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordMatchInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test("displays error messages if email is not entered", async () => {
    render(<MockApp />);

    const passwordInput = screen.getByPlaceholderText("At least 8 characters");
    const registerButton = screen.getByTestId("register-button");

    userEvent.type(passwordInput, "12345678");
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  test("displays error messages if password is null", async () => {
    render(<MockApp />);

    const emailInput = screen.getByPlaceholderText("e.g. alex@email.com");
    const registerButton = screen.getByTestId("register-button");

    userEvent.type(emailInput, "test@example.com");
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  test("displays error messages if password is less than 8 characters", async () => {
    render(<MockApp />);

    const passwordInput = screen.getByPlaceholderText("At least 8 characters");
    const registerButton = screen.getByTestId("register-button");

    userEvent.type(passwordInput, "1234567");
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Password must contain at least 8 characters, including uppercase, lowercase, and special characters"
        )
      ).toBeInTheDocument();
    });
  });

  test("displays error messages if password does not match", async () => {
    render(<MockApp />);

    const passwordInput = screen.getByPlaceholderText("At least 8 characters");
    const passwordMatchInput = screen.getByPlaceholderText(
      "Enter your password again"
    );
    const registerButton = screen.getByTestId("register-button");

    userEvent.type(passwordInput, "12345678");
    userEvent.type(passwordMatchInput, "1234567");
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });
});

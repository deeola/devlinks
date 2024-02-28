import { render, screen } from "@testing-library/react";
import { MemoryRouter, Navigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import useAuth from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth", () => jest.fn());

describe("RequireAuth component", () => {
  test("renders Outlet when auth.accessToken is truthy", () => {
    useAuth.mockReturnValue({ auth: { accessToken: "token" } });

    render(
      <MemoryRouter>
        <RequireAuth />
      </MemoryRouter>
    );

    const outletElement = screen.getByTestId("myOutlet");

    expect(outletElement).toBeInTheDocument();
  });

  test("navigates to home page when auth.accessToken is falsy", () => {
    useAuth.mockReturnValue({ auth: { accessToken: null } });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <RequireAuth />
      </MemoryRouter>
    );

    expect(screen.queryByRole("main")).not.toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/protected/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    
  });
});
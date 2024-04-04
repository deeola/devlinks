import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PersistLogin from "./PersistLogin";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

jest.mock("../../hooks/useRefreshToken", () => jest.fn());
jest.mock("../../hooks/useAuth", () => jest.fn());

describe("PersistLogin component", () => {
  test("renders loading state when isLoading is true", async () => {
    useRefreshToken.mockReturnValue(jest.fn());
    useAuth.mockReturnValue({ auth: null, persist: true });

    render(
      <MemoryRouter>
        <PersistLogin />
      </MemoryRouter>
    );

    // Wait for the loading element to be present
    await waitFor(() => {
      const loadingElement = screen.getByText(/loading/i);
      expect(loadingElement).toBeInTheDocument();
    });
  });

  test("calls refresh function when auth.accessToken is falsy and persist is true", () => {
    const refreshMock = jest.fn();
    useRefreshToken.mockReturnValue(refreshMock);
    useAuth.mockReturnValue({ auth: { accessToken: null }, persist: true });

    render(
      <MemoryRouter>
        <PersistLogin />
      </MemoryRouter>
    );

    expect(refreshMock).toHaveBeenCalled();
  });
});

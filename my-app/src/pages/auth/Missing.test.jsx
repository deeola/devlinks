import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Missing from "./Missing";

describe("Missing component", () => {
  test("renders page not found message", () => {
    render(
      <MemoryRouter>
        <Missing />
      </MemoryRouter>
    );

    const headingElement = screen.getByRole("heading", { name: /oops/i });
    const messageElement = screen.getByText(/page not found/i);
    const linkElement = screen.getByRole("link", { name: /login to continue/i });

    expect(headingElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
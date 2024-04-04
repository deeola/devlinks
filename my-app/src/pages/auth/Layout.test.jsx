import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
  test("renders children correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Check if the main element with class "App" exists
    const mainElement = getByTestId("main");
    expect(mainElement).toBeInTheDocument();
  });
});

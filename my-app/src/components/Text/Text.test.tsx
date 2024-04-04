import React from "react";
import { render, screen } from "@testing-library/react";
import { MHeader, SHeader, MBody, SBody } from "./Text";

describe("MHeader", () => {
  test("renders text correctly", () => {
    render(<MHeader text="Main Header" className="custom-class" />);

    const headerElement = screen.getByText("Main Header");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass("Mheader");
    expect(headerElement).toHaveClass("custom-class");
  });
});

describe("SHeader", () => {
  test("renders text correctly", () => {
    render(<SHeader text="Sub Header" className="custom-class" />);

    const headerElement = screen.getByText("Sub Header");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass("Sheader");
    expect(headerElement).toHaveClass("custom-class");
  });
});

describe("MBody", () => {
  test("renders text correctly", () => {
    render(<MBody text="Main Body" className="custom-class" />);

    const bodyElement = screen.getByText("Main Body");
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveClass("Mbody");
    expect(bodyElement).toHaveClass("custom-class");
  });
});

describe("SBody", () => {
  test("renders text correctly", () => {
    render(<SBody text="Sub Body" className="custom-class" />);

    const bodyElement = screen.getByText("Sub Body");
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveClass("Sbody");
    expect(bodyElement).toHaveClass("custom-class");
  });
});

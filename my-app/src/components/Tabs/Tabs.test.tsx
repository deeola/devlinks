import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "./Tabs";

describe("<Tabs />", () => {
  const mockProps = {
    text: "Example Tab",
    TabsType: "default",
    img: "example.png",
    onClick: jest.fn(),
    classname: "example-class"
  };

  test("renders Tabs correctly", () => {
    render(<Tabs {...mockProps} />);

    const tabButton = screen.getByRole("button");
    expect(tabButton).toBeInTheDocument();

    const tabImg = screen.getByAltText("Icon");
    expect(tabImg).toBeInTheDocument();
    expect(tabImg).toHaveAttribute("src", "example.png");

    const tabText = screen.getByText("Example Tab");
    expect(tabText).toBeInTheDocument();
  });

  test("calls onClick when tab is clicked", () => {
    render(<Tabs {...mockProps} />);

    const tabButton = screen.getByRole("button");
    fireEvent.click(tabButton);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  test("renders with custom classname", () => {
    render(<Tabs {...mockProps} />);

    const tabButton = screen.getByRole("button");
    expect(tabButton).toHaveClass("example-class");
  });

  test("renders with custom TabsType", () => {
    render(<Tabs {...mockProps} TabsType="active" />);

    const tabButton = screen.getByRole("button");
    expect(tabButton).toHaveAttribute("data-tabstype", "active");
  });
});

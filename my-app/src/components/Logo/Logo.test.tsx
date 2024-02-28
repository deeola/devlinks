
import { render, screen } from "@testing-library/react";
import Logo from "./Logo";
import smallLogo from "../../assets/images/logo-devlinks-small.svg";
import largeLogo from "../../assets/images/logo-devlinks-large.svg";

describe("<Logo />", () => {
  it("renders small logo when size prop is 'small'", () => {
    render(<Logo size="small" />);
    const logoElement = screen.getByAltText("devlinks-logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("src", smallLogo);
  });

  it("renders large logo when size prop is 'large'", () => {
    render(<Logo size="large" />);
    const logoElement = screen.getByAltText("devlinks-logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("src", largeLogo);
  });

  it("applies additional className if provided", () => {
    render(<Logo size="small" className="custom-class" />);
    const logoElement = screen.getByAltText("devlinks-logo");
    expect(logoElement).toHaveClass("custom-class");
  });
});

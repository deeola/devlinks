import { render, screen } from "@testing-library/react";
import PhonePreview from "./PhonePreview";

describe("<PhonePreview />", () => {
  const mockProps = {
    isPrompts: [],
    userInformation: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      imgName: "profile.jpg"
    },
    profilePicture: "https://example.com/profile.jpg",
    userId: "johndoe@example.com"
  };

  it("renders user information correctly", () => {
    render(<PhonePreview {...mockProps} />);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
  });

  it("renders profile picture correctly", () => {
    render(<PhonePreview {...mockProps} />);
    const profileImage = screen.getByAltText("Profile");
    expect(profileImage).toHaveAttribute("src", "https://example.com/profile.jpg");
  });

  it("renders links correctly", () => {
    const prompts = [
      {
        label: "Link 1",
        answer: "https://example.com/link1",
        bgColor: "#EEE",
        image: "https://example.com/link1.jpg"
      },
      {
        label: "Link 2",
        answer: "https://example.com/link2",
        bgColor: "#EEE",
        image: "https://example.com/link2.jpg"
      }
    ];
    const propsWithPrompts = { ...mockProps, isPrompts: prompts };
    render(<PhonePreview {...propsWithPrompts} />);
    expect(screen.getByText("Link 1")).toBeInTheDocument();
    expect(screen.getByText("Link 2")).toBeInTheDocument();
  });
});
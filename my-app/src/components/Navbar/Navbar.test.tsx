import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { MemoryRouter } from "react-router-dom";

describe("<Navbar />", () => {
  it("renders Navbar with provided props", async () => {
    const setIsShowProfileMock = jest.fn();
    render(
        <MemoryRouter>
        <Navbar
          isShowProfile={true}
          setIsShowProfile={setIsShowProfileMock}
        />
      </MemoryRouter>
    );

    // Check if logo elements are rendered
    const largeLogo = await screen.findByTestId("large-logo");
    expect(largeLogo).toBeInTheDocument();
    const smallLogo = await screen.findByTestId("small-logo");
    expect(smallLogo).toBeInTheDocument();

    // Check if Tabs components are rendered
    const linksTab = screen.getByText("Links");
    expect(linksTab).toBeInTheDocument();
    const profileDetailsTab = screen.getByText("Profile Details");
    expect(profileDetailsTab).toBeInTheDocument();

    // Check if Preview button and image are rendered
    const previewButton = screen.getByText("Preview");
    expect(previewButton).toBeInTheDocument();
    const previewImage = screen.getByAltText("hi");
    expect(previewImage).toBeInTheDocument();
  });

  it("calls setIsShowProfile when Tabs are clicked", () => {
    const setIsShowProfileMock = jest.fn();

    render(
        <MemoryRouter>
        <Navbar
          isShowProfile={true}
          setIsShowProfile={setIsShowProfileMock}
        />
      </MemoryRouter>
    );

    const linksTab = screen.getByText("Links");
    fireEvent.click(linksTab);
    expect(setIsShowProfileMock).toHaveBeenCalledWith(false);

    const profileDetailsTab = screen.getByText("Profile Details");
    fireEvent.click(profileDetailsTab);
    expect(setIsShowProfileMock).toHaveBeenCalledWith(true);
  });
});

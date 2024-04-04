import React from "react";
import { render, screen } from "@testing-library/react";
import UploadImage from "./UploadImage";
import { type TUploadImage } from "../../types";

describe("<UploadImage />", () => {
  const mockProps: TUploadImage = {
    text: "Upload Image",
    subtext: "Select an image to upload",
    onChange: jest.fn(),
    selectedFiles: [],
    handleClick: jest.fn(),
    inputRef: { current: document.createElement("input") },
    fileInputStyle: {}
  };

  test("renders upload text correctly", () => {
    render(<UploadImage {...mockProps} />);

    const uploadText = screen.getByText("+Upload Image");
    expect(uploadText).toBeInTheDocument();
  });

  test("renders change text correctly when files selected", () => {
    const propsWithFiles = { ...mockProps, selectedFiles: [new File(["file content"], "example.jpg")] };
    render(<UploadImage {...propsWithFiles} />);

    const changeText = screen.getByText("Change Image");
    expect(changeText).toBeInTheDocument();
  });

  test("renders subtext when provided", () => {
    render(<UploadImage {...mockProps} />);

    const subtextElement = screen.getByText("Select an image to upload");
    expect(subtextElement).toBeInTheDocument();
  });
});

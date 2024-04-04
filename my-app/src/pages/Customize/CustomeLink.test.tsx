import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../state/store"; // Import your Redux store
import CustomeLink from "./CustomeLink";

// Define shared mock user information
const mockUserInfo = {
  email: "test@example.com",
  firstName: "John",
  lastName: "Doe",
  imgName: "profile.jpg"
};

describe("CustomeLink", () => {
  test("renders correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <CustomeLink
          isPrompts={[]}
          userId="user123"
          userInformation={mockUserInfo}
        />
      </Provider>
    );

    expect(getByText("Customize your links")).toBeInTheDocument();
    expect(getByText("Let’s get you started")).toBeInTheDocument();
  });

  test("clicking add new link button adds a new link input", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <CustomeLink
          isPrompts={[]}
          userId="user123"
          userInformation={mockUserInfo}
        />
      </Provider>
    );

    const addButton = getByText("+ Add new link");
    fireEvent.click(addButton);

    // Check if a new link input is added
    await waitFor(() => {
      expect(getByPlaceholderText("Enter a valid link")).toBeInTheDocument();
    });
  });

  test("handles input change correctly", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <CustomeLink
          isPrompts={[]}
          userId="user123"
          userInformation={mockUserInfo}
        />
      </Provider>
    );

    const addButton = getByText("+ Add new link");
    fireEvent.click(addButton);

    const linkInput = getByPlaceholderText("Enter a valid link") as HTMLInputElement;
    fireEvent.change(linkInput, { target: { value: "https://example.com" } });

    expect(linkInput.value).toBe("https://example.com");
  });

  test("adds a new link prompt correctly", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <CustomeLink
          isPrompts={[]}
          userId="user123"
          userInformation={mockUserInfo}
        />
      </Provider>
    );

    const addButton = getByText("+ Add new link");
    fireEvent.click(addButton);

    // Check if a new link input is added
    await waitFor(() => {
      expect(getByPlaceholderText("Enter a valid link")).toBeInTheDocument();
    });
  });

  test("deletes a prompt correctly", async () => {
    const { getByText, queryByPlaceholderText } = render(
      <Provider store={store}>
        <CustomeLink
          isPrompts={[{ id: "1", answer: "https://example.com", label: "Example", bgColor: "", image: "", placeholder: "", userId: "" }]}
          userId="user123"
          userInformation={mockUserInfo}
        />
      </Provider>
    );

    const deleteButton = getByText("Remove");
    fireEvent.click(deleteButton);

    // Check if the prompt is removed
    await waitFor(() => {
      expect(queryByPlaceholderText("Enter a valid link")).not.toBeInTheDocument();
    });
  });
});

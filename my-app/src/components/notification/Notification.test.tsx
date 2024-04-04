import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Notification from "./Notification";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer, {
  removeNotification
} from "../../state/notification/notificationSlice";

// Mocking useSelector and useDispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe("<Notification />", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
  });

  test("renders Notification with empty notification array", () => {
    render(
      <Provider store={configureStore({ reducer: { notification: notificationReducer } })}>
        <Notification />
      </Provider>
    );

    const notificationContainer = screen.getByTestId("notification-container");
    expect(notificationContainer).toBeInTheDocument();
  });

  test("renders Notification with notifications", () => {
    const notifications = [
      { id: "1", message: "Notification 1", type: "error" },
      { id: "2", message: "Notification 2", type: "info" }
    ];
    (useSelector as unknown as jest.Mock).mockReturnValue(notifications);

    render(
      <Provider store={configureStore({ reducer: { notification: notificationReducer } })}>
        <Notification />
      </Provider>
    );

    const notificationContainer = screen.getByTestId("notification-container");
    expect(notificationContainer).toBeInTheDocument();

    const notificationText1 = screen.getByText("Notification 1");
    expect(notificationText1).toBeInTheDocument();

    const notificationText2 = screen.getByText("Notification 2");
    expect(notificationText2).toBeInTheDocument();
  });

  test("calls handleDismiss when close button is clicked", () => {
    const notifications = [{ id: "1", message: "Notification 1", type: "error" }];
    (useSelector as unknown as jest.Mock).mockReturnValue(notifications);
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    render(
      <Provider store={configureStore({ reducer: { notification: notificationReducer } })}>
        <Notification />
      </Provider>
    );

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith(removeNotification("1"));
  });
});

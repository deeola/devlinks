/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import "./Notification.css";
import { MBody } from "../Text/Text";
import { useSelector, useDispatch } from "react-redux";
import {
  removeNotification,
  selectNotification
} from "../../state/notification/notificationSlice";

import { type TNotification } from "../../types";

export default function Notification () {
  const notifications: TNotification[] = useSelector(selectNotification);
  const dispatch = useDispatch();

  const handleDismiss = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type === "error" ? "notification-error" : notification.type}`}
        >
          <>
            <MBody text={notification.message} className="notification-text" />
          </>
          <button className="notificationCloseButton" onClick={() => { handleDismiss(notification.id); }}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

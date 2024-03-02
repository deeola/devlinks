
import "./Notification.css";
import { MBody } from "../Text/Text";
import { useSelector, useDispatch } from "react-redux";
import {
  removeNotification,
  selectNotification,
} from "../../state/notification/notificationSlice";

import { TNotification } from "../../types";

export default function Notification() {

  const notifications: TNotification[] = useSelector(selectNotification);

  const dispatch = useDispatch();

  const handleDismiss = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="notication-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          <>
            {/* <img src={img} alt="notifcationimg" /> */}
            <MBody text={notification.message} className="notification-text" />
          </>
          <button onClick={() => handleDismiss(notification.id)}>
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}

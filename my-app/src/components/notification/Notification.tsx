import React from "react";
import "./Notification.css";
import { MBody } from "../Text/Text";

type TNotification = {
    img: string;
    text: string;
}

export default function Notification(Props: TNotification){
    const {img, text} = Props
    return(
        <div className="notication-container">
            <img src={img} alt="notifcationimg" />
            <MBody text={text} className="notification-text" />

        </div>
    )
}
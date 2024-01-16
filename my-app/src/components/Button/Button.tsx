import React from "react";
import "./Button.css"

type Color = "active" | "disabled";

type Button = {
    text: string,
    buttonType?: "secondary",
    backgroundSubtype?: Color
}


export default function Button(Props: Button) {

    const { text, buttonType, backgroundSubtype } = Props;


    return (
        <button className="bgColor" data-subtype={backgroundSubtype} data-buttonType={buttonType}> { text }</button >
    )
}


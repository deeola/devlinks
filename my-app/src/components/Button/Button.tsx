import React from "react";
import "./Button.css"

type Color = "active" | "disabled" | boolean;

type Button = {
    text: string,
    buttonType?: "secondary",
    backgroundSubtype?: Color,
    classname? :  string,
    onClick? : () => void
    disabled?: boolean
    type?: "submit" | "button" | "reset"
}


export default function Button(Props: Button) {

    const { text, buttonType, backgroundSubtype, classname, onClick, disabled, type } = Props;

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`bgColor ${classname}`} data-subtype={backgroundSubtype} data-buttontype={buttonType}> { text }</button >
    )
}


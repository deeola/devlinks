import React from "react";
import "./Button.css"

type Color = "active" | "disabled" | boolean;

type Button = {
    text: string,
    buttonType?: "secondary",
    backgroundSubtype?: Color,
    classname? :  string,
    onClick? : () => void
}


export default function Button(Props: Button) {

    const { text, buttonType, backgroundSubtype, classname, onClick } = Props;


    return (
        <button onClick={onClick} className={`bgColor ${classname}`} data-subtype={backgroundSubtype} data-buttonType={buttonType}> { text }</button >
    )
}


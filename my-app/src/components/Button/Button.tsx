import React from "react";
import "./Button.css"

type Color = "active" | "disabled";

type Button = {
    text: string,
    buttonType?: "secondary",
    backgroundSubtype?: Color,
    classname? :  string
}


export default function Button(Props: Button) {

    const { text, buttonType, backgroundSubtype, classname } = Props;


    return (
        <button className={`bgColor ${classname}`} data-subtype={backgroundSubtype} data-buttonType={buttonType}> { text }</button >
    )
}


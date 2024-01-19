import React from "react"
import "./Text.css"

type TText = {
    text: string,
    className?:string
}

export function MHeader(Props: TText){
    const {text, className} = Props;
    return (
        <h3 className={`Mheader ${className}`}>{text}</h3>
    )
}

export function SHeader(Props: TText){
    const {text, className} = Props;
    return (
        <h6 className={`Sheader ${className}`} >{text}</h6>
    )
}

export function MBody (Props: TText){
    const {text, className} = Props;
    return (
        <p  className={`Mbody ${className}`}>{text}</p>
    )
}

export function SBody (Props: TText){
    const {text, className} = Props;
    return (
        <p className={`Sbody ${className}`}>{text}</p>
    )
}
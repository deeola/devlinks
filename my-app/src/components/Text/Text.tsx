import React from "react"


type TText = {
    text: string,
    className?:string
}

export function MHeader(Props: TText){
    const {text} = Props;
    return (
        <h3>{text}</h3>
    )
}

export function SHeader(Props: TText){
    const {text} = Props;
    return (
        <h6>{text}</h6>
    )
}

export function MBody (Props: TText){
    const {text, className} = Props;
    return (
        <p className={className}>{text}</p>
    )
}

export function SBody (Props: TText){
    const {text} = Props;
    return (
        <p>{text}</p>
    )
}
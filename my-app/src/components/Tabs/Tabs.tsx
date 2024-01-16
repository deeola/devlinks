import React from "react";
import "./Tabs.css"



type Tabs = {
    text: string,
    TabsType?: string,
    default?: boolean
}


export default function Tabs(Props: Tabs) {

    const { text, TabsType } = Props;

    return (
        <div className="tabs" data-tabsType={TabsType}> { text }</div>
    )
}

import React,{RefAttributes} from "react";
import "./Tabs.css"
import {
    Link
  } from "react-router-dom";



type Tabs = {
    text: string,
    TabsType?: string,
    default?: boolean,
    img?: string,
    links?: string
}


export default function Tabs(Props: Tabs) {

    const { text, TabsType, img, links} = Props;

    return (
        <button className="tabs" data-tabstype={TabsType}> <span><img src={img} alt="Icon" /></span>  { text } </button>
    
    )
}

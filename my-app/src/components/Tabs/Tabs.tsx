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
    onClick?: () => void    
}


export default function Tabs(Props: Tabs) {

    const { text, TabsType, img, links, onClick} = Props;

    return (
        <button onClick={onClick} className="tabs" data-tabstype={TabsType}> <span><img src={img} alt="Icon" /></span>  { text } </button>
    
    )
}

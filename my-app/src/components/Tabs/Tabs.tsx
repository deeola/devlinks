/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import "./Tabs.css";
import { type TTabs } from "../../types";

export default function Tabs (Props: TTabs) {
  const { text, TabsType, img, onClick, classname } = Props;

  return (
    <button onClick={onClick} className={`tabs ${classname}`} data-tabstype={TabsType}>
      <span className="tabsImg">
        <img src={img} alt="Icon" />
      </span>
      <span className="tabsText">{text}</span>
    </button>
  );
}

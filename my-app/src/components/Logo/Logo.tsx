/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import largeLogo from "../../assets/images/logo-devlinks-large.svg";
import smallLogo from "../../assets/images/logo-devlinks-small.svg";
import "./Logo.css";
import { type TLogo } from "../../types";

export default function Logo (Props: TLogo) {
  const { size, className } = Props;
  return (<img className={`logo-img ${className}`} src={size === "small" ? smallLogo : largeLogo} alt="devlinks-logo"/>);
};

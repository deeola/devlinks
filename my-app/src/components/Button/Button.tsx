/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import "./Button.css";
import { type Buttons } from "../../types";

export default function Button (Props: Buttons) {
  const {
    text,
    buttonType,
    backgroundSubtype,
    classname,
    onClick,
    isDisabled,
    type,
    datatestid
  } = Props;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`button-base ${classname}`}
      data-subtype={backgroundSubtype}
      data-buttontype={buttonType}
      data-testid={datatestid}
    >
      {text}
    </button>
  );
}

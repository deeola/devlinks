/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from "react";
import "./InputField.css";
import eye from "../../assets/images/view.png";
import { type UInputs } from "../../types";

export default function InputField (Props: UInputs) {
  const { readOnly, id, name, img, placeholder, type, onChange, value, required, onFocus, inputRef, autoComplete, onBlur, error, errorMessage, passwordImg, handlePasswordClick, handlePasswordLeave, inputDataTestId } = Props;
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTyping(false);
  }, [typing, error]);

  return (
    <div data-testid="input-container" className={`input-container ${error === true ? "error" : ""}`}>
      {img !== undefined && (
        <span className="image">
          <img className="input-icon" src={img} alt="Icon" />
        </span>
      )}

      <div className="input-and-error">
        <input
          value={value}
          onChange={(e) => { onChange(e); }}
          onBlur={onBlur}
          type={type}
          id={id}
          name={name}
          data-id="myInput"
          className={`${error === true ? "error-text" : ""}`}
          placeholder={placeholder}
          onFocus={onFocus}
          required={required}
          ref={inputRef}
          autoComplete={autoComplete}
          data-testid={inputDataTestId}
          readOnly={readOnly}
        />

      {passwordImg !== undefined && (
        <span className="password-img-container" onClick={handlePasswordClick} onMouseLeave={handlePasswordLeave} data-testid="password-toggle" >
          <img className="passwordImg" src={eye} alt="Icon" />
        </span>
      )}

      {error === true && (<span className="error-span"> {errorMessage} </span>)}
      </div>
    </div>
  );
}

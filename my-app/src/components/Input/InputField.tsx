import React from "react";
import "./InputField.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { updateMergedValue } from "../../state/inputs/mergedValuesSlice";
import { MergedValues } from "../../types";
// import { updateValue, validateField } from "../../state/inputs/inputSlice";



interface UInputs {
  id: string;
  name: string;
  img?: string;
  placeholder?: string;
  type?: string;
  onChange:(e:any) => void;
  value: string|number;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  inputRef?: any;
  autoComplete?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?:boolean |string;
  errorMessage?:string;
}

export default function InputField(Props: UInputs) {

  const { id, name, img, placeholder, type , onChange, value, required, onFocus,inputRef, autoComplete, onBlur, error, errorMessage } = Props;
 

  return (
    <div className={`input-container ${error ? "error" : ""}`}>
      {img && (
        <span className="image">
          <img src={img} alt="Icon" />
        </span>
      )}

      <div className="input-and-error">
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          id={id}
          name={name}
          data-id="myInput"
          className={`${error ? "error-text" : ""}`}
          placeholder={placeholder}
          onFocus={onFocus}
          required={required}
          ref={inputRef}
          autoComplete={autoComplete}
        />
        {error && (
          <span className="error-span"> {errorMessage} </span>
        )}
      </div>
    </div>
  );
}

import React from "react";
import "./InputField.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { updateMergedValue } from "../../state/inputs/mergedValuesSlice";
import { MergedValues } from "../../state/inputs/mergedValuesSlice";
import { updateValue, validateField } from "../../state/inputs/inputSlice";

interface UInputs {
  id: string;
  name: string;
  img?: string;
  placeholder?: string;
  type?: string;
  onChange:(e:any) => void,
  value: string|number,
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean,
  inputRef?: any,
  autoComplete?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputField(Props: UInputs) {
  const dispatch = useDispatch();

  // Local state for managing the input field value
  const [localValue, setLocalValue] = React.useState("");

  const inputState = useSelector((state: RootState) => state.input);
  const { id, name, img, placeholder, type , onChange, value, required, onFocus,inputRef, autoComplete, onBlur } = Props;
  const {  errorMessage, error, touched } = inputState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setLocalValue(updatedValue);
    const partialMergedValue: Partial<MergedValues> = {
      // value:updatedValue
    };

    dispatch(updateValue(updatedValue));
    dispatch(updateMergedValue(partialMergedValue));
  };

  const handleBlur = () => {
    dispatch(validateField());
  };

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
        {touched && error && (
          <span className="error-span"> {errorMessage} </span>
        )}
      </div>
    </div>
  );
}

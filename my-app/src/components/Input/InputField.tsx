import React,{useEffect, useState} from "react";
import "./InputField.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { updateMergedValue } from "../../state/inputs/mergedValuesSlice";
import { MergedValues } from "../../types";
// import { updateValue, validateField } from "../../state/inputs/inputSlice";
import eye from "../../assets/images/view.png";



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
  passwordImg?: boolean;
  handlePasswordClick? : () => void;
  handlePasswordLeave? : () => void;
  inputDataTestId?: string;
  readOnly?: boolean;
  
}

export default function InputField(Props: UInputs) {

  const { readOnly, id, name, img, placeholder, type , onChange, value, required, onFocus,inputRef, autoComplete, onBlur, error, errorMessage, passwordImg, handlePasswordClick, handlePasswordLeave, inputDataTestId } = Props;
  const [typing, setTyping] = useState(false);





  useEffect(() => {
    setTyping(false);
  }, [typing, error]);


  return (
    <div data-testid="input-container" className={`input-container ${error ? "error" : ""}`}>
      {img && (
        <span className="image">
          <img className="input-icon" src={img} alt="Icon" />
        </span>
      )}

      <div className="input-and-error">
        <input
          value={value}
          onChange={(e) => {
          onChange(e)

        }
         
        }
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
          data-testid={inputDataTestId}
          readOnly={readOnly}
        />

      {passwordImg && (
        <span className="password-img-container" onClick={handlePasswordClick} onMouseLeave={handlePasswordLeave} data-testid="password-toggle" >
          <img className="passwordImg" src={eye} alt="Icon" />
        </span>
      )}

      {error  && (
          <span className="error-span"> {errorMessage} </span>
        )}
      </div>
    </div>
  );
}

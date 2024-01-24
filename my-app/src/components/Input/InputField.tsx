import React from "react";
import "./InputField.css";

interface UInputs {
  type: string;
  id: string;
  name: string;
  img?: string;
  errorMessage?: string;
  error?: boolean;
  placeholder?: string
}

export default function InputField(Props: UInputs) {
  const { type, id, name,  img, errorMessage, error, placeholder } = Props;


  return (
    <div className={`input-container ${error ? 'error' : ''}`}>
      <span className="image">
        <img src={img} alt="Icon" />
      </span>
      <div className="input-and-error">
        <input  type={type} id={id} name={name} data-id="myInput" className={error ? 'error-text' : ''} placeholder={placeholder} />
        {error && <span className="error-span"> {errorMessage} </span>}
      </div>
    </div>
  );
}

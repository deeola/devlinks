import React from "react";
import "./InputField.css";

interface UInputs {
  type: string;
  id: string;
  name: string;
  img?: string;
  errorMessage?: string;
  error?: boolean;
  placeholder?: string,
  value: string,
  onChange: (value:  string) => void
}

export default function InputField(Props: UInputs) {
  const { type, id, name,  img, errorMessage, error, placeholder, value, onChange } = Props;


  return (
    <div className={`input-container ${error ? 'error' : ''}`}>
      <span className="image">
        <img src={img} alt="Icon" />
      </span>
      <div className="input-and-error">
        <input value={value} onChange={(e) => onChange(e.target.value)}  type={type} id={id} name={name} data-id="myInput" className={error ? 'error-text' : ''} placeholder={placeholder} />
        {error && <span className="error-span"> {errorMessage} </span>}
      </div>
    </div>
  );
}

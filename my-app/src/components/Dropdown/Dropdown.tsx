import React, { ComponentProps } from "react";
import "./Dropdown.css";

type T = {
  value: string;
  label: string;
  image: string;
};

interface DropdownFieldProps {
  options: T[];
  id?: string;
  name?: string;
  img?: string;
  error?: boolean;
}


export default function Dropdown(Props: DropdownFieldProps ) {
  const { options, id, name, img, error } = Props;
  return (
    <div className={`dropdown-container ${error ? "error" : ""}`}>
      <span className="image">
        <img src={img} alt="Icon" />
      </span>
      <div className="dropdown-and-error">
        <select
          id={id}
          name={name}
          data-id="myDropdown"
          className={error ? "error-border" : ""}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              <div className="option-container">
                <span className="option-image">
                  <img src={option.image} alt="Option" />
                </span>
                <span>{option.label}</span>
                
              </div>
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
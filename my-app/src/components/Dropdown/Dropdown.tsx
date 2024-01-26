import React, { useState } from "react";
import "./Dropdown.css";

type Tdropdown = {
  dropArray?: {
    image: string;
    label: string;
    selected?: boolean;
  }[];
  dropdownImage?: string;
};

export default function Dropdown(Props: Tdropdown) {
  const { dropArray, dropdownImage } = Props;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    "Dropdown Field Active"
  );

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    setIsActive(false);
  };

  return (
    <div className={`custom-select ${isActive ? "active" : ""}`}>
      <button
        className="select-button"
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded={isActive ? "true" : "false"}
        aria-controls="select-dropdown"
        onClick={handleClick}
      >
       
        <div className="dropdown-selected-value">
        <span className="image">
          <img src={dropdownImage} alt="Icon" />
        </span>
          <span className="selected-value">{selectedValue}</span>
        
        </div>

        <span className="arrow"></span>
      </button>
      <ul className="select-dropdown" role="listbox" id="select-dropdown">
        {dropArray?.map((list, index) => (
          <li
            key={index}
            role="option"
            onClick={() => handleOptionClick(list.label)}
          >
            <input type="radio" id={list.label} name={list.label} />
            <label htmlFor={list.label}>
              <img className="bx bxl-github" src={list.image} />
              {list.label}
            </label>
          </li>
        ))}

        {/* Include other list items similarly */}
      </ul>
    </div>
  );
}

import React, { useState } from "react";
import "./AddLink.css";
import { MBody } from "../Text/Text";
import Dropdown from "../Dropdown/Dropdown";
import InputField from "../Input/InputField";
import iconLink from "../../assets/images/icon-link.svg";

type AddLinks = {
  number: number;
  dropArray: {
    image: string;
    label: string;
    selected?: boolean;
  }[];
  errorMessage?: string;
  placeholder: string;
  value: string; // Add value property
  onChange: (value: string) => void; // Add onChange property
};

export default function AddLink(Props: AddLinks) {
  const { number, dropArray, errorMessage, placeholder } = Props;

  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>(
    dropArray[0].label
  );
  const [inputValue, setInputValue] = useState<string>("");

  // Function to update the selected dropdown value
  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);
  };

  // Function to update the input value
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="addlink-container">
      <div className="addlinknumber-remove">
        <MBody text={`= Link #${number}`} />
        <MBody text="Remove" />
      </div>
      <div>
        <div>
          <label className="label">Platform</label>
          <div className="platform-link">
            <Dropdown
              selectedValue={selectedDropdownValue}
              onChange={handleDropdownChange}
              dropArrayImage={iconLink}
              dropArray={dropArray}
            />
          </div>
        </div>
        <div>
          <label className="label">Link</label>
          <div className="platform-link">
            <InputField
              value={inputValue}
              onChange={handleInputChange}
              type="text"
              name="link"
              id="link"
              errorMessage={errorMessage}
              img={iconLink}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

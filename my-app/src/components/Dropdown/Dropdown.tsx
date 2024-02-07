import React, { useState, useEffect } from "react";
import { updateMergedValue } from "../../state/inputs/mergedValuesSlice";
import { MergedValues } from "../../state/inputs/mergedValuesSlice";
import { useDispatch } from "react-redux";
import "./Dropdown.css";

type Tdropdown = {
  dropArray: {
    image: string;
    label: string;
    selected?: boolean;
    bgColor: string;
    id: number;
  }[];
  dropArrayImage: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function Dropdown(Props: Tdropdown) {
  const dispatch = useDispatch();

  const { dropArray, dropArrayImage } = Props;

  const [isActive, setIsActive] = useState<boolean>(false);

  const [selectedValue, setSelectedValue] = useState<string>(
    dropArray[0].label
  );

  const [selectedImage, setSelectedImage] = useState<string>(
    dropArray[0].image
  );
  const [selectedBgColor, setSelectedBgColor] = useState<string>(
    dropArray[0].bgColor
  );

  const [selectedId, setSelectedId] = useState<number>(
    dropArray[0].id
  );

  useEffect(() => {
    const partialMergedValue: Partial<MergedValues> = {
      image: selectedImage,
      label: selectedValue,
      bgColor: selectedBgColor,
      id: selectedId
    };
    dispatch(updateMergedValue(partialMergedValue));
  }, [selectedValue, selectedImage,selectedBgColor, selectedId, dispatch]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option: string, image: string, color: string, id: number) => {
    setSelectedId(id)
    setSelectedValue(option);
    setSelectedImage(image);
    setSelectedBgColor(color)
    setIsActive(false);
    const partialMergedValue: Partial<MergedValues> = {
      image: selectedImage,
      label: selectedValue,
      bgColor: selectedBgColor,
      id: selectedId


    };
    dispatch(updateMergedValue(partialMergedValue));
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
            <img
              src={dropArray.length === 0 ? dropArrayImage : selectedImage}
              alt="Icon"
            />
          </span>

          <span className="selected-value">
            {dropArray.length !== 0 ? selectedValue : dropArray[0].label}
          </span>
        </div>

        <span className="arrow"></span>
      </button>
      <ul className="select-dropdown" role="listbox" id="select-dropdown">
        {dropArray?.map((list, index) => (
          <li
            key={index}
            role="option"
            aria-selected={selectedValue === list.label ? "true" : "false"}
            onClick={() => handleOptionClick(list.label, list.image, list.bgColor, list.id)}
          >
            <input type="radio" id={list.label} name={list.label} />
            <label htmlFor={list.label}>
              <img className="bx bxl-github" src={list.image} alt="" />
              {list.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

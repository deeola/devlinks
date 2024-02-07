import React, { useState } from "react";
import "./AddLink.css";
import { MBody } from "../Text/Text";
import Dropdown from "../Dropdown/Dropdown";
import InputField from "../Input/InputField";
import iconLink from "../../assets/images/icon-link.svg";
import { useDispatch } from "react-redux";
import { removeLink } from "../../state/link/linkSlice";
import { updateMergedValue } from "../../state/inputs/mergedValuesSlice";
import { MergedValues } from "../../state/inputs/mergedValuesSlice";

type AddLinks = {

  dropArray: {
    image: string;
    label: string;
    selected?: boolean;
    bgColor: string;
    id: string;
  }[];
  id: string,
  number: number


};

export default function AddLink(Props: AddLinks) {
  const dispatch = useDispatch();

  const { number, id, dropArray } = Props;


  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>(
    dropArray[0].label
  );

  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);

    const partialMergedValue: Partial<MergedValues> = {
      id: id,
      bgColor: "#3B3054",
    };

    dispatch(updateMergedValue(partialMergedValue));
  };

  const handleInputChange = (value: string) => {
    // const partialMergedValue: Partial<MergedValues> = {
    //   id: number,
    //   value: value,
    // };

    // dispatch(updateMergedValue(partialMergedValue));
  };

  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(removeLink(id));
  };

  return (
    <div className="addlink-container">
      <div className="addlinknumber-remove">
        <MBody text={`= Link #${number}`} />
        <button onClick={handleRemove}> Remove </button>
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
              name="link"
              id="link"
              img={iconLink}
              placeholder={"www.your-link.com"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

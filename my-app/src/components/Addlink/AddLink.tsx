import React, { useState } from "react";
import "./AddLink.css";
import { MBody } from "../Text/Text";
import Dropdown from "../Dropdown/Dropdown";
import InputField from "../Input/InputField";
import iconLink from "../../assets/images/icon-link.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeLink } from "../../state/link/linkSlice";
import { updateMergedValue } from "../../state/inputs/mergedValuesSlice";
import { MergedValues } from "../../state/inputs/mergedValuesSlice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../state/store";

type AddLinks = {
number: number;
id: string;
key: string;
};

export default function AddLink(Props: AddLinks) {
  const dispatch = useDispatch();

  const { number, key, id } = Props;



  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>(
   "Github"
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
            {/* <Dropdown here*/}
          </div>
        </div>
        <div>
          <label className="label">Link</label>
          <div className="platform-link">
            {/* Input here*/}
          </div>
        </div>
      </div>
    </div>
  );
}

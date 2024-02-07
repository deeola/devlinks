import { useState } from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import picture from "../../assets/images/illustration-empty.svg";
import AddLink from "../../components/Addlink/AddLink";
import { linkArray } from "../../linkArray";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { addNewLink } from "../../state/link/linkSlice";
import { addComponent } from "../../state/link/linkComponentSlice";
import {
  MergedValues,
  updateMergedValue,
} from "../../state/inputs/mergedValuesSlice";

import { validateField } from "../../state/inputs/inputSlice";
import { v4 as uuidv4 } from "uuid";

export default function CustomeLink() {
  const dispatch = useDispatch();
  // selectors
  const links = useSelector((state: RootState) => state.link.links);
  const linksComponents = useSelector(
    (state: RootState) => state.linkComponentSlice.components
  );
  const mergedValue = useSelector(
    (state: RootState) => state.mergedValuesSlice.mergedValue
  );
  const error = useSelector((state: RootState) => state.error.code);
  const value = useSelector((state: RootState) => state.input.value);
  const myerror = useSelector((state: RootState) => state.input.error);


  const handleSave = (): void => {
    // if (value === "" || mergedValue.value !== "") {
    //   dispatch(validateField());
    //   console.log(myerror, "myerror")
    // } else{
      
    // }


    dispatch(addNewLink(mergedValue));
  };


 


  const handleAddLink = (): void => {


    dispatch(
      addComponent(
        <AddLink
          id={uuidv4()}
          dropArray={linkArray}
          number={linksComponents.length + 1}
        />
      )
    );




  };
  


  return (
    <div className="customelinkcontainer">
      <div className="edit-links-remove">
        <MHeader className="your-links" text="Customize your links" />
        <MBody text="Add/edit/remove links below and then share all your profiles with the world!" />
        <div className="add-new-link">
          <Button
            onClick={handleAddLink}
            buttonType="secondary"
            text="+ Add new link"
          />
        </div>
        <div>
          {linksComponents.length === 0 ? (
            <div className="link-middle">
              <div className="link-middle-image">
                <img src={picture} alt="get-started-icon" />
              </div>
              <div className="link-middle-header">
                <MHeader text="Let’s get you started" />
              </div>
              <div className="link-middle-text">
                <MBody
                  className="link-middle-mbody"
                  text="Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!"
                />
              </div>
            </div>
          ) : (
            linksComponents.map((linked) => <>{linked}</>)
          )}
        </div>
      </div>

      <div className="custome-save-button">
        <Button
          backgroundSubtype={linksComponents.length === 0 && "active"}
          classname="custom-button"
          text="Save"
          onClick={handleSave}
        />
      </div>
    </div>
  );
}

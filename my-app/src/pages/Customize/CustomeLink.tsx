import React, { useState } from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import picture from "../../assets/images/illustration-empty.svg";
import AddLink from "../../components/Addlink/AddLink";
import { linkArray } from "../../linkArray";

export default function CustomeLink() {
  const [addlink, setAddLink] = useState<boolean>(false);

  const handleDisplayForm = () => {
    setAddLink(true);
  };
  return (
    <div className="customelinkcontainer">
      <div className="edit-links-remove">
        <MHeader className="your-links" text="Customize your links" />
        <MBody text="Add/edit/remove links below and then share all your profiles with the world!" />
        <div className="add-new-link">
          <Button
            onClick={handleDisplayForm}
            buttonType="secondary"
            text="+ Add new link"
          />
        </div>
        {!addlink ? (
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
          <AddLink
            placeholder="https://www.github.com/benwright"
            number={1}
            dropArray={linkArray}
          />
        )}
      </div>

      <div className="custome-save-button">
        <Button
          backgroundSubtype="active"
          classname="custom-button"
          text="Save"
        />
      </div>
    </div>
  );
}

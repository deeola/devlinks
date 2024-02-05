import React, { useState } from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import picture from "../../assets/images/illustration-empty.svg";
import AddLink from "../../components/Addlink/AddLink";
import { linkArray } from "../../linkArray";

export default function CustomeLink() {
  const [addlink, setAddLink] = useState<boolean>(false);
  const [linkAdded, setLinkAdded] = useState<number>(0);
  const [links, setLinks] = useState([{name: "github", link:"www.link.com", picture: picture}])

  const [linkComponents, setLinkComponents] = useState<JSX.Element[]>([]);

  const handleAddLink = (): void => {
    setLinkComponents((prevComponents) => [
      ...prevComponents,
      <AddLink
        key={prevComponents.length + 1}
        placeholder="https://www.example.com"
        number={prevComponents.length + 1}
        dropArray={linkArray}
        value=""
        onChange={() => {}}
      />,
    ]);
    setAddLink(true);
  };

  const handleSave = (): void =>{
console.log(links)
  }
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
          {linkComponents.length === 0 ? (
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
            <div>{linkComponents}</div>
          )}
        </div>
      </div>

      <div className="custome-save-button">
        <Button
          backgroundSubtype="active"
          classname="custom-button"
          text="Save"
          onClick={handleSave}
        />
      </div>
    </div>
  );
}

// style={{ maxHeight: "250px", overflowY: "auto" }}

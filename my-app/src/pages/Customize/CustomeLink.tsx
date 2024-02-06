import React, { useState } from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import picture from "../../assets/images/illustration-empty.svg";
import AddLink from "../../components/Addlink/AddLink";
import { linkArray } from "../../linkArray";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../state/store";
import { addNewLink } from "../../state/link/linkSlice";
import { addComponent } from "../../state/link/linkComponentSlice";

export default function CustomeLink() {

  const dispatch = useDispatch();

  // selectors

  const links = useSelector((state: RootState) => state.link.links);
  const linksComponents = useSelector((state: RootState) => state.linkComponentSlice.components);

  console.log(linksComponents, "linksComponents")




  // value from inputfield and dropdown
    const [linked, setLinks] = useState([{name: "github", link:"www.link.com", picture: picture}])

  // const [linkComponents, setLinkComponents] = useState<JSX.Element[]>([]);

 

  console.log(linksComponents, "linksComponents")

 

  console.log(links, "addLink");

  const handleAddLink = (): void => {
    dispatch(addComponent(
      <AddLink
        key={0}
        placeholder="https://mylinked.com"
        number={linksComponents.length + 1}
        dropArray={linkArray}
        value=""
        onChange={() => {}}
      />,
    ))
  };

  const handleSave = (): void => {
    dispatch(addNewLink(linked))
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
            linksComponents.map((linked) => (
              <>{linked}</>
            ))
          )}
        </div>
      </div>

      <div className="custome-save-button">
        <Button
          backgroundSubtype= {linksComponents.length === 0 && "active"}
          classname="custom-button"
          text="Save"
          onClick={handleSave}
        />
      </div>
    </div>
  );
}

// style={{ maxHeight: "250px", overflowY: "auto" }}

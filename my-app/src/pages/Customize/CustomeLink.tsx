import React from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import picture from "../../assets/images/illustration-empty.svg"

export default function CustomeLink() {
  return (
    <div>
      <MHeader text="Customize your links" />
      <MBody text="Add/edit/remove links below and then share all your profiles with the world!" />
      <div>
        <Button text="+ Add new link" />
      </div>
      <div className="link-middle">
        <div>
            <img src={picture} alt="get-started-icon" />
        </div>
        <div>
          <MHeader text="Let’s get you started" />
        </div>
        <div>
          <MBody text="Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!" />
        </div>
      </div>
      <div>
        <Button text="Save" />
      </div>
    </div>
  );
}

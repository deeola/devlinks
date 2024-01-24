import React from "react";
import "./Customize.css";
import Logo from "../../components/Logo/Logo";
import Tabs from "../../components/Tabs/Tabs";
import Button from "../../components/Button/Button";
import PhonePreview from "./PhonePreview";
import CustomeLink from "./CustomeLink";

export default function Customize() {


  return (
    <section>
      <div className="Navbar">
        <div className="custom-logo-container">
          <Logo size="large" />
        </div>
        <div>
          <Tabs text="Links" />
          <Tabs text="Profile Details" />
        </div>
        <div>
          <Button text="Preview" />
        </div>
      </div>
      <div className="customContainer">
        <div>
            <PhonePreview />
        </div>
        <div>
            <CustomeLink />
        </div>


      </div>
    </section>
  );
}

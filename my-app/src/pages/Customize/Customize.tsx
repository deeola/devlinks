import React, { useState } from "react";
import "./Customize.css";
import Logo from "../../components/Logo/Logo";
import Tabs from "../../components/Tabs/Tabs";
import Button from "../../components/Button/Button";
import PhonePreview from "./PhonePreview";
import CustomeLink from "./CustomeLink";
import links from "../../assets/images/icon-link.svg";
import profiledetails from "../../assets/images/icon-profile-details-header.svg";
import linkImg from "../../assets/images/icon-link.svg";
import Profile from "../Profile/Profile";




export default function Customize() {
  
  const [isSaved, setIsSaved] = useState<boolean>(false);




  return (
    <section className="customize">
      <div className="Navbar">
        <div className="custom-logo-container">
          <Logo size="large" />
        </div>
        <div className="navlinks-button">
          <div className="navlinks">
            <Tabs links="/" img={links} text="Links" />
            <Tabs
              links="/"
              img={profiledetails}
              text="Profile Details"
              TabsType="default"
            />
          </div>
          <div>
            <Button buttonType="secondary" text="Preview" />
          </div>
        </div>
      </div>
      <div className="customContainer">
          <PhonePreview  isSaved={isSaved} />
          {/* <CustomeLink /> */}

           <Profile  /> 
     
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import Tabs from "../Tabs/Tabs";
import linkIcon from "../../assets/images/icon-link.svg";
import profiledetails from "../../assets/images/icon-profile-details-header.svg";
import iconPreview from "../../assets/images/icon-preview-header.svg";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { type Tnavbar } from "../../types";

export const Navbar = (Props: Tnavbar) => {
  const { isShowProfile, setIsShowProfile } = Props;

  return (
    <nav className="Navbar">
      <div className="custom-logo-container">
        <Logo logoDataTestId="large-logo" size="large" className="large-logo" />
        <Logo logoDataTestId="small-logo" size="small" className="small-logo"/>
      </div>
      <div className="navlinks-button">
          <Tabs
            links="/"
            img={linkIcon}
            text="Links"
            TabsType={isShowProfile ? "default" : "active"}
            onClick={() => { setIsShowProfile(false); }}
          />
          <Tabs
            links="/"
            img={profiledetails}
            text="Profile Details"
            TabsType={!isShowProfile ? "default" : "active"}
            onClick={() => { setIsShowProfile(true); }}
          />
        </div>
      <div className="navbarPreview">
      <Link to={"/preview"}>
          <Button isDisabled={false} buttonType="secondary" text="Preview" classname="previewLarge" />
          <div className="previewSmall">
          <img alt="hi" src={iconPreview} />
          </div>
        </Link>
      </div>
    </nav>
  );
};

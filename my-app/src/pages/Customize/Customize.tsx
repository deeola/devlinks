import  { useState } from "react";
import "./Customize.css";
import Logo from "../../components/Logo/Logo";
import Tabs from "../../components/Tabs/Tabs";
import Button from "../../components/Button/Button";
import PhonePreview from "./PhonePreview";
import CustomeLink from "./CustomeLink";
import links from "../../assets/images/icon-link.svg";
import profiledetails from "../../assets/images/icon-profile-details-header.svg";
import Profile from "../Profile/Profile";
import useRefreshToken from "../../hooks/useRefreshToken";
import { Link } from "react-router-dom";

export default function Customize() {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);

  const refresh = useRefreshToken();

  return (
    <section className="customize">
      <div className="Navbar">
        <div className="custom-logo-container">
          <Logo size="large" />
        </div>
        <div className="navlinks-button">
          <div className="navlinks">
            <Tabs
              links="/"
              img={links}
              text="Links"
              onClick={() => setIsShowProfile(false)}
            />
            <Tabs
              links="/"
              img={profiledetails}
              text="Profile Details"
              TabsType="default"
              onClick={() => setIsShowProfile(true)}
            />
          </div>
          <div className="preview-sign">
            <Link to={"/preview"}>
               <Button disabled={false} buttonType="secondary" text="Preview" />
            </Link>
            <Link to={"/preview"}>
               <Button disabled={false} buttonType="secondary" text="Sign Out" />
            </Link>
          </div>
        </div>
      </div>
      <div className="customContainer">
        <PhonePreview />
        {isShowProfile ? <Profile /> : <CustomeLink />}
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import "./Customize.css";
import Logo from "../../components/Logo/Logo";
import Tabs from "../../components/Tabs/Tabs";
import Button from "../../components/Button/Button";
import PhonePreview from "./PhonePreview";
import CustomeLink from "./CustomeLink";
import links from "../../assets/images/icon-link.svg";
import profiledetails from "../../assets/images/icon-profile-details-header.svg";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";
import { getlinks, selectAllPrompts } from "../../state/link/promptSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../state/store";
import { selectAuthenticatedUser } from "../../state/user/authSlice";
import { getSpecificUserInfo, selectUser } from "../../state/user/userSlice";

export default function Customize() {
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);
  const username = useSelector(selectAuthenticatedUser);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSpecificUserInfo(username?.username));
    
  }, []);

  useEffect(() => {
    dispatch(getlinks(username?.username));

  }, []);

  const linksArray = useSelector(selectAllPrompts);
  const UserInformation = useSelector(selectUser);

  console.log(UserInformation, "UserInformation inside customize page");

  console.log(linksArray, "linksArray inside customize page");

  console.log(username?.username, "username inside customize page");

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
        <PhonePreview
          isPrompts={linksArray}
          userId={username !== undefined && username?.username}
          userInformation={UserInformation}
        />
        {isShowProfile ? (
          <Profile isPrompts={linksArray} userId={username?.username} />
        ) : (
          <CustomeLink
            isPrompts={linksArray}
            userId={username?.username}
            userInformation={UserInformation}
          />
        )}
      </div>
    </section>
  );
}

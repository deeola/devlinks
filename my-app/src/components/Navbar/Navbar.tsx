import "./Navbar.css";
import Logo from "../Logo/Logo";
import Tabs from "../Tabs/Tabs";
import linkIcon from "../../assets/images/icon-link.svg";
import profiledetails from "../../assets/images/icon-profile-details-header.svg";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

type Tnavbar = {
  isShowProfile: boolean;
  setIsShowProfile: (value: boolean) => void;
};

export const Navbar = (Props: Tnavbar) => {
  const { isShowProfile, setIsShowProfile } = Props;

  return (
    <nav className="Navbar">
      <div className="custom-logo-container">
        <Logo size="large" />
      </div>
      <div className="navlinks-button">
        <div className="navlinks">
          <Tabs
            links="/"
            img={linkIcon}
            text="Links"
            TabsType={isShowProfile ? "default" : "active"}
            onClick={() => setIsShowProfile(false)}
          />
          
          <Tabs
            links="/"
            img={profiledetails}
            text="Profile Details"
            TabsType={!isShowProfile ? "default" : "active"}
            onClick={() => setIsShowProfile(true)}
          />
        </div>

        <Link to={"/preview"}>
          <Button isDisabled={false} buttonType="secondary" text="Preview" />
        </Link>
      </div>
    </nav>
  );
};

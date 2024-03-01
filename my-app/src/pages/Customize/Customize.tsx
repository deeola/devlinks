import { useState} from "react";
import "./Customize.css";
import Logo from "../../components/Logo/Logo";
import Tabs from "../../components/Tabs/Tabs";
import Button from "../../components/Button/Button";
import PhonePreview from "./PhonePreview";
import CustomeLink from "./CustomeLink";
import profiledetails from "../../assets/images/icon-profile-details-header.svg";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetLinksQuery, useGetUsersInfoQuery, useGetPhotoQuery } from "../../state/api/apiSlice";


export default function Customize() {
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);
  

  //get username from the auth state in useContext
  const { auth } = useAuth();
  let username = auth?.user;


  const {
    data: userInfo,
    isLoading: userInfoLoading,
    isSuccess: userInfoSuccess,
    isError: userInfoError,
    error: userInfoErrorData,
  } = useGetUsersInfoQuery(username);
  

let UserInformation;
let pictureLink;


 if (userInfoSuccess) {
  UserInformation = userInfo;


} else if (userInfoError) {
  if('status' in userInfoErrorData && userInfoErrorData.status === 404){
    UserInformation = {};
  } else {
    console.error("An error occurred:", userInfoErrorData);
  }
 
}

const {data: pictured} = useGetPhotoQuery(UserInformation?.imgName)


if(pictured?.url !== undefined){
  pictureLink = pictured.url;
} else{
  pictureLink = "";
}


 


const {
  data: links,
  isLoading,
  isSuccess,
  isError,
  error
} = useGetLinksQuery(username);


let linksArray;

if (isSuccess) {
  linksArray = links;

} else if (isError) {
  if ('status' in error && error.status === 404) {

    linksArray = []; 
    console.log(linksArray.length);

  } else {

    console.error("An error occurred:", error);
  }
}


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
          userId={username}
          userInformation={UserInformation}
          profilePicture={pictureLink}
        />
        {isShowProfile ? (
          <Profile  userInformation={UserInformation} userId={username} />
        ) : (
          <CustomeLink
            isPrompts={linksArray}
            userId={username}
            userInformation={UserInformation}
          />
        )}
      </div>
    </section>
  );
}
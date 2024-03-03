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
import { addNotification, removeNotification } from "../../state/notification/notificationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";


export default function Customize() {
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);
  

  //get username from the auth state in useContext
  const { auth } = useAuth();
  let username = auth?.user;

  const dispatch = useDispatch<AppDispatch>();


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
    dispatch(addNotification({ message: "No user inforrmation", type: "error" , id: "no-user-information" }))
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




      dispatch(addNotification({ message: "No links found", type: "warning" , id: "emptylinks" }))

      // setTimeout(() => {
      //   dispatch(removeNotification("emptylinks"));
      // }, 3000);

   
    
     
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
              TabsType={ isShowProfile ?  "default" : "active"}
              onClick={() => setIsShowProfile(false)}
            />
            <Tabs
              links="/"
              img={profiledetails}
              text="Profile Details"
              TabsType={ !isShowProfile ?  "default" : "active"}
              onClick={() => setIsShowProfile(true)}
            />
          </div>
   
            <Link to={"/preview"}>
              <Button isDisabled={false} buttonType="secondary" text="Preview" />
            </Link>
        
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
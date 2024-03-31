import { useState } from "react";
import "./Preview.css";
import Button from "../../components/Button/Button";
import { MBody, SBody } from "../../components/Text/Text";
import arrow from "../../assets/images/icon-arrow-right.svg";


import { Link } from "react-router-dom";

import {
  useGetLinksQuery,
  useGetUsersInfoQuery,
  useGetPhotoQuery,
} from "../../state/api/apiSlice";
import { useAuth } from "../../context/AuthProvider";


export default function Preview() {
  const { auth } = useAuth();
  let username = auth?.user;


  const {
    data: userInfo,
    isSuccess: userInfoSuccess,
    isError: userInfoError,
    error: userInfoErrorData,
  } = useGetUsersInfoQuery(username);

  let UserInformation 
  let pictureLink;

  console.log(userInfo, "userInfo in preview")
  
  if (userInfoSuccess) {
    UserInformation = userInfo;

  } else if (userInfoError) {
    if ("status" in userInfoErrorData && userInfoErrorData.status === 404) {
      UserInformation = {};
    } else {
      UserInformation = {};
      console.error("An error occurred:", userInfoErrorData);
    }
  }


  console.log(UserInformation?.imgName)

  const {
    data: pictured,
    isSuccess: picturedSuccess,
    isLoading: picturedLoading,
  } = useGetPhotoQuery(UserInformation?.imgName);



  if (pictured?.url !== undefined) {
    pictureLink = pictured.url;
  } else {
    pictureLink = "";
  }

  const {
    data: links,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLinksQuery(username);

  let linksArray;

  if (isLoading) {
    linksArray = [];
  
  } else if (isSuccess) {
    linksArray = links;
  } else if (isError) {
    if ("status" in error && error.status === 404) {
      linksArray = [];
      console.log(linksArray.length);
    } else {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className="preview-container">
      <div className="preview-Header">
        <div className="preview-navbar-container">
          <Link to={"/customize"} className="preview-navbar-link">
            <Button text="Back to Editor" />
          </Link>
          <Button text="Share Link" classname="preview-navbar-link" />
        </div>
      </div>
      <div className="preview-body">
        <div className="preview-card-container">
          <div className="preview-card-user-details">
            <div className="profile-image-container">
              <img
                className="preview-img"
                src={pictureLink}
                alt="display-img"
              />
            </div>

            <div className="preview-name-wrapper">
              <MBody text={UserInformation?.firstName ? UserInformation.firstName : "" } className="preview-username" />
              <MBody text={UserInformation?.lastName ? UserInformation.lastName : ""} className="preview-username" />
            </div>
            <SBody text={username} className="preview-email" />
          </div>
          <div className="preview-cards">
            {linksArray.map((prompt: any) => (
              <a
                target="_blank"
                href={prompt.answer}
                rel="noreferrer"
                className="cards"
                style={{ backgroundColor: prompt.bgColor }}
                key={prompt.label}
              >
                <div className="preview-card-icon-name-container">
                  <img
                    className="preview-card-icon"
                    src={prompt.image}
                    alt="card-img"
                  />
                  <MBody text={prompt.label} className="card-name" />
                </div>
                <img className="card-arrow" src={arrow} alt="card-img" />
              </a>
            ))}
          </div>
          {
            linksArray.length === 0 && (<MBody text="No links added yet" className="no-links" />)
          }

        </div>
      </div>
    </div>
  );
}




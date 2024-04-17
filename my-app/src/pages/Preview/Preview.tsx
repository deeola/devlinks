/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import "./Preview.css";
import Button from "../../components/Button/Button";
import { MBody, SBody } from "../../components/Text/Text";
import arrow from "../../assets/images/icon-arrow-right.svg";

import { Link } from "react-router-dom";
import { addNotification, removeNotification } from "../../state/notification/notificationSlice";
import {
  useGetLinksQuery,
  useGetUsersInfoQuery,
  useGetPhotoQuery
} from "../../state/api/apiSlice";
import { useAuth } from "../../context/AuthProvider";
import { useDispatch } from "react-redux";

export default function Preview () {
  const { auth } = useAuth();
  const username = auth?.user;
  const dispatch = useDispatch();
  // share link

  const {
    data: userInfo,
    isSuccess: userInfoSuccess,
    isError: userInfoError,
    error: userInfoErrorData
  } = useGetUsersInfoQuery(username);

  // eslint-disable-next-line @typescript-eslint/ban-types
  let UserInformation;
  let pictureLink;

  if (userInfoSuccess) {
    UserInformation = userInfo;
  } else if (userInfoError) {
    if ("status" in userInfoErrorData && userInfoErrorData.status === 404) {
      UserInformation = {};
    } else {
      UserInformation = {};
    }
  }

  const link = `${window.location.origin}/shared/${username}`;

  const copyLink = () => {
    if (!userInfo) {
      dispatch(
        addNotification({
          type: "error",
          message: "Unable to copy profile link. Enter your user info please.",
          id: "cannot-copy-links"
        })
      );

      setTimeout(() => {
        dispatch(removeNotification("cannot-copy-links"));
      }, 4000);
      return;
    }

    navigator.clipboard.writeText(link)
      .then(() => {
        dispatch(
          addNotification({
            type: "success",
            message: "Profile link copied to clipboard successfully",
            id: "copy-links"
          })
        );

        setTimeout(() => {
          dispatch(removeNotification("copy-links"));
        }, 4000);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
        dispatch(
          addNotification({
            type: "error",
            message: "Unable to copy profile link",
            id: "copy-link-error"
          })
        );

        setTimeout(() => {
          dispatch(removeNotification("copy-link-error"));
        }, 3000);
      });
  };

  const {
    data: pictured
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
    error
  } = useGetLinksQuery(username);

  let linksArray;

  if (isLoading) {
    linksArray = [];
  } else if (isSuccess) {
    linksArray = links;
  } else if (isError) {
    if ("status" in error && error.status === 404) {
      linksArray = [];
    } else {
      console.error("An error occurred:", error);
    }
  }

  const urlRegex = /^https:\/\/deola-devlinks\.s3\.eu-central-1\.amazonaws\.com\/undefined/;

  const testedProfilePicture = urlRegex.test(pictureLink);

  return (
    <div className="preview-container">
      <div className="preview-Header">
        <div className="preview-navbar-container">
          <Link to={"/customize"} className="preview-navbar-link">
            <Button text="Back to Editor" buttonType="secondary" />
          </Link>
          <Button text="Share Link" classname="preview-navbar-link" onClick={copyLink} />
        </div>
      </div>
      <div className="preview-body">
        <div className="preview-card-container">
          <div className="preview-card-user-details">
            <div className="profile-image-container">

              {
                !testedProfilePicture
                  ? <img
                className="preview-img"
                src={pictureLink }
                alt="display-img"
              />
                  : <h1 className="preview-img txtProfileImg">{username.charAt(0).toUpperCase() }</h1>
              }

            </div>

            <div className="preview-name-wrapper">
              <MBody text={UserInformation?.firstName ? UserInformation.firstName : "" } className="preview-username" />
              <MBody text={UserInformation?.lastName ? " " + UserInformation.lastName : ""} className="preview-username" />
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

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import "./Share.css";
import "../Preview/Preview.css";
import { MBody, SBody } from "../../components/Text/Text";
import arrow from "../../assets/images/icon-arrow-right.svg";
import {
  useGetLinksQuery,
  useGetUsersInfoQuery,
  useGetPhotoQuery
} from "../../state/api/apiSlice";
import { Link, useParams } from 'react-router-dom';

export default function Share () {
  const { userId } = useParams();
  const username = userId;

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
    }
  }

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

  if (!userInfo && !isLoading) {
    return (<h1>no user found</h1>);
  }

  const urlRegex = /^https:\/\/deola-devlinks\.s3\.eu-central-1\.amazonaws\.com\/undefined/;

  const testedProfilePicture = urlRegex.test(pictureLink);

  return (
    <div className="preview-container">
      <section className="preview-body">
        <div className="share-preview-card-container">
          <div className="preview-card-user-details">
            <div className="profile-image-container">
            {
                !testedProfilePicture
                  ? <img
                className="preview-img"
                src={pictureLink }
                alt="display-img"
              />
                  : <h1 className="preview-img txtProfileImg">{UserInformation?.email.charAt(0).toUpperCase() }</h1>
              }

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

           <Link className="link-to" to={"/register"}>
                <MBody className="loginQuestion" text={"Create yout own devlinks account"} />
        </Link>
        </div>
      </section>
    </div>
  );
}

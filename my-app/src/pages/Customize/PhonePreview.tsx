/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useEffect, useState } from "react";
import "./PhonePreview.css";
import arrow from "../../assets/images/icon-arrow-right.svg";
import { MBody, SBody } from "../../components/Text/Text";
import { type TPhonePreviewProps } from "../../types";

export default function PhonePreview (Props: TPhonePreviewProps) {
  let { isPrompts, userInformation, profilePicture, userId, isPictureLoading } = Props;

  if (!userInformation) {
    userInformation = null;
  }

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picture: ""
  });

  useEffect(() => {
    if (userInformation !== null) {
      setDetails({
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        email: userInformation.email,
        picture: userInformation.imgName
      });
    }
  }, [userInformation]);

  if (!isPrompts) {
    // Handle the case where isPrompts (linksArray) is undefined
    isPrompts = [];
  }

  let mylinks: object[] = [];

  if (isPrompts.length > 0) {
    mylinks = isPrompts;
  }

  // hide other items if the length is more than 5
  const shouldScroll = isPrompts.length > 5;

  console.log(profilePicture);

  const urlRegex = /^https:\/\/deola-devlinks\.s3\.eu-central-1\.amazonaws\.com\/undefined/;

  return (
    <div className="phonePreview">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="308"
        height="632"
        fill="none"
        viewBox="0 0 308 632"
      >
        <path
          stroke="#737373"
          d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
        />
        <path
          fill="#fff"
          stroke="#737373"
          d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
        />
        {(!profilePicture && !isPictureLoading) || urlRegex.test(profilePicture)
          ? (
          <circle cx="153.5" cy="112" r="48" fill="#EEE" />
            )
          : (
          <foreignObject
            x="100"
            y="64"
            width="100"
            height="100"
            className="rounded-image-foreign"
          >
            <div className="rounded-image-container">
              <img src={profilePicture} alt="Profile" className="rounded-image" />
            </div>
          </foreignObject>
            )}

        {!details.firstName && !details.lastName
          ? (
          <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
            )
          : (
          <foreignObject x="0" y="180" className="nameEmailForeignObject">
            <div className="textFONAMES">
            <MBody className="textFNAME" text={details.firstName} />
            <MBody className="textLNAME" text={" " + details.lastName} />
            </div>

          </foreignObject>
            )}

        {!userId
          ? (
          <rect width="160" height="16" x="73.5" y="207" fill="#EEE" rx="8" />
            )
          : (
          <foreignObject x="0" y="220" className="nameEmailForeignObject">
            <SBody className="textFO" text={userId} />
          </foreignObject>
            )}

        {mylinks.length === 0
          ? (
          <>
            <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" />
            <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
            <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
            <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
            <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" />
          </>
            )
          : (
          <foreignObject className="foreignObjContainer" >
  <div className="scrollableLink">
    {mylinks.map(
      (myarray: any, index: any) =>
        myarray.label !== "Please select a label" &&
        myarray.answer !== "" && (
          <foreignObject
            key={index}
            x="35"
            y={278 + index * 64}
            width="237"
            height="44"
          >
            <a
              className="linkTagContainer"
              style={{ backgroundColor: myarray.bgColor }}
              href={myarray.answer}
              target="_blank"
              rel="noreferrer"
            >
              <div className="linkTagSubContainer">
                <img
                  src={myarray.image}
                  alt="Imagee"
                  className="linkImage"
                />
                <SBody className="labelText" text={myarray.label} />
              </div>
              <div className="linkArrowContainer" >
                <img
                  src={arrow}
                  alt="arrow"
                  className="linkArrow"
                />
              </div>
            </a>
          </foreignObject>
        )
    )}
    {/* Empty foreignObject element to reserve space for scrollbar */}
    {shouldScroll && (
      <foreignObject
        x="35"
        y={278 + 5 * 64}
        width="237"
        height="44"
      ></foreignObject>
    )}
  </div>
</foreignObject>

            )}
      </svg>
    </div>
  );
}

import React from "react";
import "./Preview.css";
import Button from "../../components/Button/Button";
import { MBody, SBody } from "../../components/Text/Text";
import arrow from "../../assets/images/icon-arrow-right.svg";
import github from "../../assets/images/icon-github.svg";
import twitter from "../../assets/images/icon-twitter.svg";
import linkedin from "../../assets/images/icon-linkedin.svg";
import profileimage from "../../assets/images/mann.jpeg";

export default function Preview() {
  return (
    <div className="preview-container">
      <div className="preview-Header">
        <div className="preview-navbar-container">
          <Button text="Back to Editor" classname="preview-navbar-link" />
          <Button text="Share Link" classname="preview-navbar-link"  />
        </div>
      </div>
      <div className="preview-body">
        <div className="preview-card-container">
          <div className="preview-card-user-details">
            <div className="profile-image-container">
            <img className="preview-img" src={profileimage} alt="display-img" />
            </div>
            <MBody text="Ben Wright" className="preview-username" />
            <SBody text="ben@example.com" className="preview-email" />
          </div>
          <div className="preview-cards">
            <div className="cards">
              <div className="preview-card-icon-name-container">
                <img className="preview-card-icon" src={github} alt="card-img" />
                <MBody text="Github" className="card-name"/>
              </div>
              <img className="card-arrow" src={arrow} alt="card-img" />
            </div>
            <div className="cards">
              <div className="preview-card-icon-name-container">
                <img className="preview-card-icon" src={twitter} alt="card-img" />
                <MBody text="Twitter" className="card-name" />
              </div>
              <img className="card-arrow" src={arrow} alt="card-img" />
            </div>
            <div className="cards">
              <div className="preview-card-icon-name-container">
                <img className="preview-card-icon" src={linkedin} alt="card-img" />
                <MBody text="Linkedin" className="card-name" />
              </div>
              <img className="card-arrow" src={arrow} alt="card-img" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

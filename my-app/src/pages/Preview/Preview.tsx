import React from "react";
import "./Preview.css";
import Button from "../../components/Button/Button";
import { MBody, SBody } from "../../components/Text/Text";

export default function Preview() {
  return (
    <div className="preview-container">
      <div className="preview-Header">
        <div className="preview-navbar-container">
          <Button text="Back to Editor" />
          <Button text="Share Link" />
        </div>
      </div>
      <div className="preview-body">
        <div className="preview-card-container">
          <div className="preview-card-user-details">
            <img className="oreview-img" src="" alt="display-img" />
            <MBody text="Ben Wright" />
            <SBody text="ben@example.com" />
          </div>
          <div className="preview-cards">
            <div className="cards">
              <div>
                <img className="preview-card-icon" src="" alt="card-img" />
                <p>Github</p>
              </div>
              <img className="card-arrow" src="" alt="card-img" />
            </div>
            <div className="cards">
              <div>
                <img className="preview-card-icon" src="" alt="card-img" />
                <p>Twitter</p>
              </div>
              <img className="card-arrow" src="" alt="card-img" />{" "}
            </div>
            <div className="cards">
              <div>
                <img className="preview-card-icon" src="" alt="card-img" />
                <p>Linkedin</p>
              </div>
              <img className="card-arrow" src="" alt="card-img" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

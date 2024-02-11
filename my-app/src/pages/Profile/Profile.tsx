import React from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import UploadImage from "../../components/Uploadimage/UploadImage";
import InputField from "../../components/Input/InputField";
import Button from "../../components/Button/Button";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile-container">
      <div>
        <div>
          <MHeader className="profile-details" text="Profile Details" />
          <MBody
            className="profile-details-subtext"
            text="Add your details to create a personal touch to your profile"
          />
        </div>
        <div className="profile-picture-container">
          <p className="profile-picture-text">Profile Picture</p>
          <div className="upload-image-container">
            <UploadImage
              text="Image must be below 1024x1024px"
              subtext="Use PNG or JPG format."
            />
          </div>
        </div>
      </div>
      <form className="form">
        <div className="form_control">
          <div className="label-container">
            <label>First Name</label>
            <span>*</span>
          </div>
          <div className="inputfield-container">
          <InputField
            type="text"
            id="name"
            name="first_name"
            placeholder="e.g John"
          />
          </div>
          
        </div>

        <div className="form_control">
          <div className="label-container">
            <label>Last Name</label>
            <span>*</span>
          </div>
          <div className="inputfield-container">
          <InputField
            type=""
            id="name"
            name="last_name"
            placeholder="e.g Appleased"
          />
          </div>

         
        </div>
        <div className="form_control">
          <div className="label-container">
            <label>Email</label>
          </div>
          <div className="inputfield-container">
          <InputField
            id="email"
            name="email"
            placeholder="e.g email@example.com"
          />
          </div>
         
        </div>
      </form>

      <div>
        <div className="custome-save-button">
          <Button classname="custom-button" text="Save" />
        </div>
      </div>
    </div>
  );
}

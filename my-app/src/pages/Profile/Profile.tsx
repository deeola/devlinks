/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useRef, type SetStateAction } from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import UploadImage from "../../components/Uploadimage/UploadImage";
import InputField from "../../components/Input/InputField";
import Button from "../../components/Button/Button";
import "./Profile.css";
import {
  useAddUsersInfoMutation,
  useSubmitPhotoMutation
} from "../../state/api/apiSlice";
import { type IProfileUserInfo } from "../../types";

export default function Profile (Props: IProfileUserInfo) {
  const { userInformation, userId } = Props;

  const buttonText = userInformation?.firstName ? "Update" : "Save";

  const [addUserInfo] = useAddUsersInfoMutation();

  const ref = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImage, setProfileImage] =
    React.useState<SetStateAction<string>>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileInputStyle, setFileInputStyle] = useState<React.CSSProperties>({});
  const [file, setFile] = useState<File | undefined>();

  const handleClick = () => {
    ref.current?.click();
  };

  const [userInfo, setUserInfo] = useState<{
    firstName: string
    lastName: string
    email: string
  }>({
    firstName: "",
    lastName: "",
    email: userId
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFile(file);

    const files: File[] = Array.from(event.target.files ?? []);
    setSelectedFiles(files);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFileInputStyle({
          backgroundImage: `url(${reader.result})`
        });
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const [submitPhotoMutation] = useSubmitPhotoMutation();

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = await submitPhotoMutation({ event: e, image: file });

    let imageName;
    if ("data" in url && url.data) {
      imageName = url.data.imageName;
    }
    const userData = { ...userInfo, imgName: imageName };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    addUserInfo(userData);

    return userData;
  };

  return (
    <div className="profile-container">
      <form className="form" onSubmit={handleSave}>
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
            <div className="upload-image-containers">
              <UploadImage
                text="Image must be below 5mb"
                subtext="Use PNG or JPG format."
                onChange={fileSelected}
                fileInputStyle={fileInputStyle}
                handleClick={handleClick}
                selectedFiles={selectedFiles}
                inputRef={ref}
              />
            </div>
          </div>
        </div>

        <div className="input-update-container">

          <div className="general-input-container">
            <div className="form_control">
              <div className="label-container">
                <label>First Name</label>
                <span>*</span>
              </div>
              <div className="inputfield-container">
                <InputField
                  type="text"
                  id="first_name"
                  name="firstName"
                  placeholder="e.g John"
                  onChange={handleInput}
                  value={userInfo.firstName}
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
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="e.g Appleased"
                  onChange={handleInput}
                  value={userInfo.lastName}
                />
              </div>
            </div>
            <div className="form_control">
              <div className="label-container">
                <label>Email</label>
              </div>
              <div className="inputfield-container">
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g email@example.com"
                  onChange={handleInput}
                  value={userId}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <div className="custome-save-button ">
              <Button classname="custom-button" text={buttonText} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

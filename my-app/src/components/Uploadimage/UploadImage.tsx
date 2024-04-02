/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import uploadimageicon from "../../assets/images/icon-upload-image.svg";
import "./UploadImage.css";
import { MBody } from "../Text/Text";

export interface TUploadImage {
  text: string
  subtext?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  selectedFiles: File[]
  handleClick: () => void
  inputRef: React.RefObject<HTMLInputElement>
  fileInputStyle: React.CSSProperties
}

export default function UploadImage (Props: TUploadImage) {
  const { text, subtext, onChange, selectedFiles, fileInputStyle, handleClick, inputRef } = Props;

  return (
    <div className="upload-image-container">
      <div onClick={handleClick} className={`file-input ${selectedFiles.length ? "uploaded" : ""}`} style={fileInputStyle}>
        <div className={`overlay ${selectedFiles.length ? "uploaded" : ""}`} ></div>
        <div className="upload-image-text">
          <img alt="profile" src={uploadimageicon} className={`upload-icon ${selectedFiles.length ? "uploaded" : ""}`} />
          <span className={`upload-text ${selectedFiles.length ? "uploaded" : ""}`} >{!selectedFiles.length ? "+Upload Image" : "Change Image"}</span>
        </div>

        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={onChange}
          accept="image/*"
        />
      </div>

      <div className="file-name-text">
        <MBody
          text={!selectedFiles.length ? text : selectedFiles[0].name}
        />
        {(subtext && !selectedFiles.length) && <MBody text={subtext} />}
      </div>
    </div>
  );
};

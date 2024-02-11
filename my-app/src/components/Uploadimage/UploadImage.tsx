import React, { useRef, useState, ChangeEvent } from "react";
import uploadimageicon from "../../assets/images/icon-upload-image.svg";
import "./UploadImage.css";
import { MBody } from "../Text/Text";

type TUploadImage = {
  text: string;
  subtext?: string;
}

export default function UploadImage (Props: TUploadImage) {
  const { text, subtext } = Props;
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileInputStyle, setFileInputStyle] = useState<React.CSSProperties>({});

  const handleClick = () => {
    ref.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []) as File[];
    setSelectedFiles(files);

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFileInputStyle({
            backgroundImage: `url(${reader.result})`,
          });
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="upload-image-container">
      <div onClick={handleClick} className={`file-input ${selectedFiles.length ? "uploaded" : ""}`} style={fileInputStyle}>
        <div  className={`overlay ${selectedFiles.length ? "uploaded" : ""}`} ></div>
        <div className="upload-image-text">
          <img src={uploadimageicon} className={`upload-icon ${selectedFiles.length ? "uploaded" : ""}`}  />
          <span  className={`upload-text ${selectedFiles.length ? "uploaded" : ""}`} >{!selectedFiles.length ? "+Upload Image" : "Change Image"}</span>
        </div>

        <input
          type="file"
          ref={ref}
          className="hidden"
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <div>
        <MBody
          text={!selectedFiles.length ? text :  selectedFiles[0].name}
        />
        {(subtext && !selectedFiles.length) && <MBody text={subtext} />}
      </div>
    </div>
  );
}
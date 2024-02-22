import React,{useState, useRef, SetStateAction} from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import UploadImage from "../../components/Uploadimage/UploadImage";
import InputField from "../../components/Input/InputField";
import Button from "../../components/Button/Button";
import "./Profile.css";
import {  useDispatch } from "react-redux";
import { setUserInformation, userInfoThunk, userImageURLThunk  } from "../../state/user/userSlice";
import { AppDispatch } from "../../state/store";


export default function Profile() {


  const dispatch = useDispatch<AppDispatch>();
    const ref = useRef<HTMLInputElement>(null);
   
    const [profileImage, setProfileImage] = React.useState<SetStateAction<string>>("");

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [fileInputStyle, setFileInputStyle] = useState<React.CSSProperties>({});

    const handleClick = () => {
        ref.current?.click();
      };

    const [userInfo, setUserInfo] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        profileImage: SetStateAction<string>;
      
    }>({
        firstName: "",
        lastName: "",
        email: "",
        profileImage: "",
      })

      const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({
          ...userInfo,
          [name]: value,
        })

        console.log(name, value)
      }

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const files = Array.from(e.currentTarget.files ?? []) as File[];
        setSelectedFiles(files);
        
    
        if (files.length > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              setFileInputStyle({
                backgroundImage: `url(${reader.result})`,
              });


              setProfileImage(reader.result as string);
            }
          };

          reader.readAsDataURL(files[0]);
        }

       
      };

    
      const handleSave = async(e: any) => {
        e.preventDefault();
        const userData = { ...userInfo, profileImage};
        const response = {email: "my@test.com", profileImage: profileImage}
        dispatch(userInfoThunk(userData))
        // await dispatch(userImageURLThunk(response));
        return userData;
        
      };

  return (
    <div className="profile-container">
      <form className="form" onSubmit={handleSave} >
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
              onChange={handleChange}
              fileInputStyle={fileInputStyle}
              handleClick={handleClick}
              selectedFiles={selectedFiles}
              inputRef={ref}
            />
          </div>
        </div>
      </div>
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
            value={userInfo.email}
          />
          </div>
         
        </div>

        <div>
        <div className="custome-save-button">
          <Button classname="custom-button" text="Save"  />
        </div>
      </div>
      </form>

     
    </div>
  );
}

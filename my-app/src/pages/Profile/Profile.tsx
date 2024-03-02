import React,{useState, useRef, SetStateAction} from "react";
import { MBody, MHeader } from "../../components/Text/Text";
import UploadImage from "../../components/Uploadimage/UploadImage";
import InputField from "../../components/Input/InputField";
import Button from "../../components/Button/Button";
import "./Profile.css";
import { useAddUsersInfoMutation, useSubmitPhotoMutation, useGetPhotoQuery } from "../../state/api/apiSlice";



type TProps = {
 userInformation: any;
  userId: string;
}



export default function Profile(Props: TProps ) {

  const { userInformation, userId} = Props;



  const buttonText = userInformation?.firstName  ? "Update" : "Save"; 

  const [addUserInfo] = useAddUsersInfoMutation();

    const ref = useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = React.useState<SetStateAction<string>>("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [fileInputStyle, setFileInputStyle] = useState<React.CSSProperties>({});
    const [file, setFile] = useState()

    const handleClick = () => {
        ref.current?.click();
      };


    const [userInfo, setUserInfo] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        
      
    }>({
        firstName: "",
        lastName: "",
        email: userId
      })



      const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({
          ...userInfo,
          [name]: value,
        })

        console.log(name, value)
      }


      const fileSelected = (event:any) => {
        const file = event.target.files[0]
        setFile(file)
      }

 
      
const [submitPhotoMutation] = useSubmitPhotoMutation()
      

    
      const handleSave = async(e: any) => {
        e.preventDefault();
       
        const response = {email: userId, profileImage: profileImage}
        //  await dispatch(userImageURLThunk(response));

 
        const url = await submitPhotoMutation({event:e , image:file});

        console.log(url)

        let imageName;
if ('data' in url && url.data) {
    imageName = url.data.imageName;
} else {
    // Handle the case where data doesn't exist or is null/undefined
}


        const userData = { ...userInfo, imgName: imageName};

        console.log(userData, "userData")

        addUserInfo(userData)
 
       
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
              text="Image must be below 5mb"
              subtext="Use PNG or JPG format."
              // onChange={handleChange}
              onChange={fileSelected}
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
          <MBody text={userId} />
          <div className="inputfield-container">
          {/* <InputField
          type="email"
            id="email"
            name="email"
            placeholder="e.g email@example.com"
            onChange={handleInput}
            value={userInfo.email}
          /> */}
          </div>
         
        </div>

        <div>
        <div className="custome-save-button">
          <Button classname="custom-button" text={buttonText}  />
        </div>
      </div>
      </form>

     
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./Preview.css";
import Button from "../../components/Button/Button";
import { MBody, SBody } from "../../components/Text/Text";
import arrow from "../../assets/images/icon-arrow-right.svg";
import github from "../../assets/images/icon-github.svg";
import twitter from "../../assets/images/icon-twitter.svg";
import linkedin from "../../assets/images/icon-linkedin.svg";
import profileimage from "../../assets/images/mann.jpeg";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getlinks } from "../../state/link/promptSlice";




export default function Preview() {
    const myPrompts = useSelector((state:RootState) => state.link.links)
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state:RootState) => state.user.users )
    const [linksArray, setLinksArray] = useState<any[]>([])


    const firstname = "my@test.com"

  useEffect(() => {
dispatch(getlinks({ user: firstname})).then((action: any) => {
  if (getlinks.fulfilled.match(action)) {
    setLinksArray(action.payload)
  }
});

  }, [dispatch]);


    console.log(myPrompts)

    // const {firstName, lastName, email, profileImage} = users;

    const firstName = "Mann"
    const lastName = "Mann"
    const email = "adeola@gmail.com"
    const profileImage = "https://res.cloudinary.com/djvjxp2am/image/upload/v1631530733/Profile%20Pictures/IMG_20210913_123456"

    let profileName:string = `${firstName}${lastName}`;



  return (
    <div className="preview-container">
      <div className="preview-Header">
        <div className="preview-navbar-container">
          <Link to={"/customize"} className="preview-navbar-link" >
          <Button text="Back to Editor" />
          </Link>
          <Button text="Share Link" classname="preview-navbar-link"  />
        </div>
      </div>
      <div className="preview-body">
        <div className="preview-card-container">
          <div className="preview-card-user-details">
            <div className="profile-image-container">
            <img className="preview-img" src={profileImage ? profileImage : profileimage} alt="display-img" />
            </div>
            <MBody text={profileName ? profileName : "Adeola Bamigboye"} className="preview-username" />
            <SBody text={email ? email : "ben@example.com"} className="preview-email" />
          </div>
          <div className="preview-cards">
            {
                linksArray.map(prompt => (
                    <a target="_blank" href={prompt.answer} rel="noreferrer" className="cards" style={{ backgroundColor: prompt.bgColor }}>
                    <div className="preview-card-icon-name-container">
                      <img className="preview-card-icon" src={prompt.image} alt="card-img" />
                      <MBody text={prompt.label} className="card-name"/>
                    </div>
                    <img className="card-arrow" src={arrow} alt="card-img" />
                  </a>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

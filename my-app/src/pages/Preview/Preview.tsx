import { useEffect, useState } from "react";
import "./Preview.css";
import Button from "../../components/Button/Button";
import { MBody, SBody } from "../../components/Text/Text";
import arrow from "../../assets/images/icon-arrow-right.svg";
import profileimage from "../../assets/images/mann.jpeg";
import { useSelector } from "react-redux";
import { AppDispatch} from "../../state/store";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getlinks, selectAllPrompts } from "../../state/link/promptSlice";
import {  selectUser } from "../../state/user/userSlice";

export default function Preview() {

  const dispatch = useDispatch<AppDispatch>();
  


  const userInformation = useSelector(selectUser);

  const [details, setDetails] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (userInformation !== null) {
      setDetails({
        name: `${userInformation.firstName} ${userInformation.lastName}`,
        email: userInformation.email,
      });
    }
  }, [userInformation]);

  useEffect(() => {
    dispatch(getlinks("my@test.coms"));
  }, [dispatch]);

  const linksArray = useSelector(selectAllPrompts);

  const profileImage = "https://res.cloudinary.com/djvjxp2am/image/upload/v1631530733/Profile%20Pictures/IMG_20210913_123456";

  return (
    <div className="preview-container">
      <div className="preview-Header">
        <div className="preview-navbar-container">
          <Link to={"/customize"} className="preview-navbar-link">
            <Button text="Back to Editor" />
          </Link>
          <Button text="Share Link" classname="preview-navbar-link" />
        </div>
      </div>
      <div className="preview-body">
        <div className="preview-card-container">
          <div className="preview-card-user-details">
            <div className="profile-image-container">
              <img
                className="preview-img"
                src={profileImage ? profileImage : profileimage}
                alt="display-img"
              />
            </div>
            <MBody text={details.name} className="preview-username" />
            <SBody text={details.email} className="preview-email" />
          </div>
          <div className="preview-cards">
            {linksArray.map((prompt: any) => (
              <a
                target="_blank"
                href={prompt.answer}
                rel="noreferrer"
                className="cards"
                style={{ backgroundColor: prompt.bgColor }}
              >
                <div className="preview-card-icon-name-container">
                  <img
                    className="preview-card-icon"
                    src={prompt.image}
                    alt="card-img"
                  />
                  <MBody text={prompt.label} className="card-name" />
                </div>
                <img className="card-arrow" src={arrow} alt="card-img" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

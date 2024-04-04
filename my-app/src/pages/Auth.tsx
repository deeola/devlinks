/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState, useEffect, useRef, type MutableRefObject } from "react";
import "./Auth.css";
import Logo from "../components/Logo/Logo";
import { MBody, MHeader, SBody } from "../components/Text/Text";
import InputField from "../components/Input/InputField";
import Button from "../components/Button/Button";
import mailbox from "../assets/images/icon-email.svg";
import password from "../assets/images/icon-password.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../state/store";
import { register } from "../state/user/authSlice";

import { useAuthFormValidation } from "../hooks/useAuthFormValidation";
import {
  addNotification,
  removeNotification
} from "../state/notification/notificationSlice";

export default function Auth () {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [user, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    emailRef.current?.focus(); // focus on email input on page load
  }, []);

  const { errors, validateForm } = useAuthFormValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm(user, pwd, matchPwd);

    if (isValid) {
      try {
        dispatch(register({ user, pwd })).then((action: any) => {
          if (register.fulfilled.match(action)) {
            navigate("/");
            dispatch(
              addNotification({
                message: `Account with username: ${user} has been created successfully. Please login to continue.`,
                type: "success",
                id: "accountcreated-auth"
              })
            );
            setTimeout(() => {
              dispatch(removeNotification("accountcreated-auth"));
            }, 6000);
          } else {
            if (
              action.payload &&
              action.payload.message === "Username already exists"
            ) {
              dispatch(
                addNotification({
                  message:
                    "User already exists, please login or use a different email",
                  type: "error",
                  id: "unauthorizedauth"
                })
              );
              setEmail("");
              setPwd("");
              setMatchPwd("");

              setTimeout(() => {
                dispatch(removeNotification("unauthorizedauth"));
              }, 6000);
            } else if (
              action?.payload &&
              action.payload.message === "No Server Response"
            ) {
              dispatch(
                addNotification({
                  message: "No server response, please try again later",
                  type: "error",
                  id: "noserverresponse-auth"
                })
              );

              setTimeout(() => {
                dispatch(removeNotification("noserverresponse-auth"));
              }, 6000);
            }
          }
        });
      } catch (err: any) {
        dispatch(
          addNotification({
            message: "An unexpected error occurred. Please try again later.",
            type: "error",
            id: "unexpectederror-auth"
          })
        );

        setTimeout(() => {
          dispatch(removeNotification("unexpectederror-auth"));
        }, 6000);
      }
    }
  };

  return (
    <section className="authSection">
      <form className="authContainer" onSubmit={handleSubmit}>
        <div>
          <div className="logoContainer">
            <Logo className="logo" size="large" />
          </div>
          <div className="devAuthContainer">
            <div className="authHeaderContainer">
              <MHeader text="Create account" className="authHeading" />
              <MBody text={"Let's get you started sharing your links"} />
            </div>
            <div>
              <div className="inputcontainer">
                <SBody className="label" text="Email address" />

                <InputField
                  img={mailbox}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. alex@email.com"
                  value={user}
                  onChange={(e) => { setEmail(e.target.value); }}
                  aria-describedby="uidnote"
                  inputRef={emailRef}
                  autoComplete="off"
                  error={!!errors.user}
                  errorMessage={errors.user}
                />
              </div>

              <div>
                <div className="inputcontainer">
                  <SBody className="label" text="Create password" />
                  <InputField
                    placeholder="At least 8 characters"
                    img={password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    onChange={(e) => { setPwd(e.target.value); }}
                    value={pwd}
                    aria-describedby="pwdnote"

                    error={!!errors.pwd}
                    errorMessage={
                      errors.pwd !==
                      "Password must contain at least 8 characters, including uppercase, lowercase, and special characters"
                        ? errors.pwd
                        : ""
                    }
                    passwordImg
                    handlePasswordClick={() => { setShowPassword(true); }}
                    handlePasswordLeave={() => { setShowPassword(false); }}
                    inputDataTestId="password-input"
                  />
                </div>
                <div className="inputcontainer">
                  <SBody className="label" text="Confirm password" />
                  <InputField
                    name="confirm_pwd"
                    placeholder="Enter your password again"
                    img={password}
                    id="confirm_pwd"
                    onChange={(e) => { setMatchPwd(e.target.value); }}
                    value={matchPwd}
                    aria-describedby="confirmnote"

                    errorMessage={errors.matchPwd}
                    passwordImg
                    error={!!errors.matchPwd}
                    handlePasswordClick={() => { setShowPassword(true); }}
                    handlePasswordLeave={() => { setShowPassword(false); }}
                    inputDataTestId="pwdMatch-input"
                    type={showPassword ? "text" : "password"}
                  />
                </div>
                <div className="passwordcontain">
                  <SBody
                  className="passwordcontain-text"
                    text={
                      errors.pwd ===
                      "Password must contain at least 8 characters, including uppercase, lowercase, and special characters"
                        ? errors.pwd
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
            <div className="buttoncontainer">
              <Button
                text="Create new account"
                isDisabled={!!(!user && !pwd && !matchPwd)}
                backgroundSubtype={
                  !user && !pwd && !matchPwd ? "active" : "secondary"
                }

                datatestid="register-button"
              />
            </div>

            <div className="questioncontainer">
              <MBody text={"Already have an account?"} />
              <Link className="link-to" to="/">
                <MBody className="loginQuestion" text={"Login"} />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

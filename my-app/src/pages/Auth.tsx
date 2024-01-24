import React from "react";
import "./Auth.css";
import Logo from "../components/Logo/Logo";
import { MBody, MHeader, SBody } from "../components/Text/Text";
import InputField from "../components/Input/InputField";
import Button from "../components/Button/Button";
import mailbox from "../assets/images/icon-email.svg";
import password from "../assets/images/icon-password.svg";

type TAuth = {
  componentType: "login" | "create";
};

export default function Auth(Props: TAuth) {
  const { componentType } = Props;

  return (
    <section className="authSection">
      <div className="authContainer">
        <div className="logoContainer">
          <Logo size="large" />
        </div>
        <div className="devAuthContainer">
          <div className="authHeaderContainer">
            <MHeader
              text={componentType === "login" ? "Login" : "Create account"}
              className="authHeading"
            />
            <MBody
              text={
                componentType === "login"
                  ? "Add your details below to get back into the app"
                  : "Let's get you started sharing your links"
              }
            />
          </div>
          <div>
            <div className="inputcontainer">
              <SBody className="label" text="Email address" />
              <InputField img={mailbox} type="email" id="email" name="email" placeholder="e.g. alex@email.com" />
            </div>
            {componentType === "login" && (
              <div className="inputcontainer">
                <SBody className="label" text="Password" />
                <InputField
                  img={password}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
            )}

            {componentType === "create" && (
              <div>
                <div className="inputcontainer">
                  <SBody className="label" text="Create password" />

                  <InputField
                    img={password}
                    type="password"
                    id="createpassword"
                    name="createpassword"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="inputcontainer">
                  <SBody className="label" text="Confirm password" />
                  <InputField
                    img={password}
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="passwordcontain">
                <MBody text="Password must contain at least 8 characters" />
                </div>
               
              </div>
            )}
          </div>
          <div className="buttoncontainer">
          <Button
            text={componentType === "login" ? "Login" : "Create new account"}
          />
          </div>
          
          <div className="questioncontainer">
            <MBody
              text={
                componentType === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"
              }
            />
            <MBody
            className="loginQuestion"
              text={componentType === "login" ? "Create account" : "Login"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

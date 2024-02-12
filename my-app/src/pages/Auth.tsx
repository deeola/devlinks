

import React,{useState, useEffect, useRef, MutableRefObject} from "react";
import "./Auth.css";
import Logo from "../components/Logo/Logo";
import { MBody, MHeader, SBody } from "../components/Text/Text";
import InputField from "../components/Input/InputField";
import Button from "../components/Button/Button";
import mailbox from "../assets/images/icon-email.svg";
import password from "../assets/images/icon-password.svg";

const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';




export default function Auth() {
  
    const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])


  
  // State for input values
//   const [emailValue, setEmailValue] = useState<string>('');
//   const [passwordValue, setPasswordValue] = useState<string>('');

  // State update functions for input values
//   const handleEmailChange = (value: string) => {
//     setEmailValue(value);
//   };

//   const handlePasswordChange = (value: string) => {
//     setPasswordValue(value);
//   };

const error=!validEmail || !validPwd || !validMatch

console.log(error)

  return (
    <section className="authSection">
      <div className="authContainer">
        <div className="logoContainer">
          {/* Assuming Logo component is used here */}
          <Logo size="large" />
        </div>
        <div className="devAuthContainer">
          <div className="authHeaderContainer">
            <MHeader
              text= "Create account"
              className="authHeading"
            />
            <MBody
              text={
               "Let's get you started sharing your links"
              }
            />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                inputRef={emailRef}
                autoComplete="off"

              />
            </div>

          
              <div>
                <div className="inputcontainer">
                  <SBody className="label" text="Create password" />
                  <InputField
                    // img={password}
                    // type="password"
                    // id="createpassword"
                    // name="createpassword"
                    // placeholder="At least 8 characters"
                    // value={passwordValue}
                    // onChange={handlePasswordChange}

                    placeholder="At least 8 characters"
                    img={password}
                    name="password"
                    type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                  />
                </div>
                <div className="inputcontainer">
                  <SBody className="label" text="Confirm password" />
                  <InputField
                    // img={password}
                    // type="password"
                    // id="confirmpassword"
                    // name="confirmpassword"
                    // placeholder="At least 8 characters"
                    // value={passwordValue}
                    // onChange={handlePasswordChange}
                    name="confirm_pwd"
                    placeholder="At least 8 characters"
                    img={password}
                    type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                  />
                </div>
                <div className="passwordcontain">
                  <SBody text="Password must contain at least 8 characters" />
                </div>
              </div>
         
          </div>
          <div className="buttoncontainer">
            <Button
              text= "Create new account"
              disabled={!validEmail || !validPwd || !validMatch ? true : false}
            />
          </div>
          
          <div className="questioncontainer">
            <MBody
              text={
  
                   "Already have an account?"
              }
            />
            <MBody
              className="loginQuestion"
              text={ "Login"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}



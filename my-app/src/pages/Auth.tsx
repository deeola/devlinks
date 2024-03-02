import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import "./Auth.css";
import Logo from "../components/Logo/Logo";
import { MBody, MHeader, SBody } from "../components/Text/Text";
import InputField from "../components/Input/InputField";
import Button from "../components/Button/Button";
import mailbox from "../assets/images/icon-email.svg";
import password from "../assets/images/icon-password.svg";
import axios from "../api/axios";
import { head } from "lodash";
import Login from "./Login";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { register } from "../state/user/authSlice";
import useAuth from "../hooks/useAuth";

const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


export default function Auth() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const errRef: MutableRefObject<HTMLInputElement | null>  = useRef(null);

  const [user, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState({
    user: "",
    pwd: "",
    matchPwd: "",
  });


  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg({
      user: "",
      pwd: "",
      matchPwd: "",
    });
  }, [user, pwd, matchPwd]);

  const emailError = emailFocus && user && !validEmail;
  const passwordError = pwdFocus && !validPwd;
  const matchError = matchFocus && !validMatch;

  const handleSubmit = async(e: any) => {

    e.preventDefault();
    
    const v1 = EMAIL_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = pwd === matchPwd;
    if (!v1 || !v2) {
      setErrMsg({
        user: !v1 ? "Please enter a valid email address." : "",
        pwd: !v2 ? "Please enter a valid password." : "",
        matchPwd: !v3 ? "Passwords do not match." : "",
      });
      return;
    }

    try {
      dispatch(register({ user, pwd }));

      dispatch(register({ user, pwd })).then((action) => {
        if (register.fulfilled.match(action)) {
          // setUser({user})

          // setAuth({ user, pwd, accessToken: action.payload.accessToken });

          // dispatch(getSpecificUserInfo(user));
           navigate("/");

        } else{
        }});

   
            setEmail('');
            setPwd('');
            setMatchPwd('');
        
    } catch (err:any) {
       if (err.response?.status === 409) {
            setErrMsg({
                user: "Email already exists",
                pwd: "",
                matchPwd: ""
            });
        } 
        errRef.current?.focus();
        return err.response?.status;
    
       

    }

    
  };


  return (
    <section className="authSection">

      <form className="authContainer" onSubmit={handleSubmit}>
        <div>
          <div className="logoContainer">
            <Logo size="large" />
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
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  inputRef={emailRef}
                  autoComplete="off"
                  error={emailError}
                  errorMessage={errMsg.user}
                />
              </div>

              <div>
                <div className="inputcontainer">
                  <SBody className="label" text="Create password" />
                  <InputField
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
                    errorMessage={errMsg.pwd}
                    error={passwordError}
                  />
                </div>
                <div className="inputcontainer">
                  <SBody className="label" text="Confirm password" />
                  <InputField
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
                    errorMessage={errMsg.matchPwd}
                    error={matchError}
                  />
                </div>
                <div className="passwordcontain">
                  <SBody text="Password must contain at least 8 characters" />
                </div>
              </div>
            </div>
            <div className="buttoncontainer">
              <Button
                text="Create new account"
                disabled={
                  !validEmail || !validPwd || !validMatch ? true : false
                }
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


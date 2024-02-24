import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import "./Auth.css";
import Logo from "../components/Logo/Logo";
import { MBody, MHeader, SBody } from "../components/Text/Text";
import InputField from "../components/Input/InputField";
import Button from "../components/Button/Button";
import mailbox from "../assets/images/icon-email.svg";
import password from "../assets/images/icon-password.svg";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login} from "../state/user/authSlice";
import { AppDispatch } from "../state/store";

const LOGIN_URL = '/auth';

export default function Login() {

  const dispatch = useDispatch<AppDispatch>();
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const errRef: MutableRefObject<HTMLInputElement | null>  = useRef(null);

  const [user, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [auth, setAuth] = useState({});


 

  useEffect(() => {
    emailRef.current?.focus();
  }, []);


  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);




  const handleSubmit = async (e:any) => {
    e.preventDefault();

   

    try {
          dispatch(login({user, pwd}))
          

        //  setUser({ user });


        //  dispatch(login({ user, pwd })).then((action) => {
        //   if (login.fulfilled.match(action)) {
        //     setUser({user})
        //     localStorage.setItem('isLoggedIn', "true");
        //   } else{
        //   }});

        
        setEmail('');
        setPwd('');
        setSuccess(true);
        
    } catch (err:any) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current?.focus();
    }
}


  return (
    <section className="authSection">
      <form className="authContainer" onSubmit={handleSubmit}>
        <div>
          <div className="logoContainer">
            {/* Assuming Logo component is used here */}
            <Logo size="large" />
          </div>
          <div className="devAuthContainer">
            <div className="authHeaderContainer">
              <MHeader text="Login" className="authHeading" />
              <MBody text={"Add your details below to get back on the app"} />
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
        
                  required
        
                  aria-describedby="uidnote"
                  inputRef={emailRef}
                  autoComplete="off"
                  error={errMsg}
                  errorMessage={"Please enter email address"}
                />
              </div>

              <div>
                <div className="inputcontainer">
                  <SBody className="label" text="Password" />
                  <InputField
                    placeholder="Enter your password"
                    img={password}
                    name="password"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-describedby="pwdnote"
                    errorMessage={errMsg}
                    error={"Please enter a password"}
                  />
                </div>

              </div>
            </div>
            <div className="buttoncontainer">
              <Button
                text="Login"
                disabled={
                  !user || !pwd ? true : false
                }
              />
            </div>

            <div className="questioncontainer">
              <MBody text={"Don't have an account?"} />
              <Link className="link-to" to={"/register"}>
              <MBody className="loginQuestion" text={"Create account"} />
              </Link>
             
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

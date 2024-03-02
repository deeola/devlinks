import { useState, useEffect, useRef, MutableRefObject } from "react";
import "./Auth.css";
import Logo from "../components/Logo/Logo";
import { MBody, MHeader, SBody } from "../components/Text/Text";
import InputField from "../components/Input/InputField";
import Button from "../components/Button/Button";
import mailbox from "../assets/images/icon-email.svg";
import password from "../assets/images/icon-password.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../state/user/authSlice";
import { AppDispatch } from "../state/store";

import useAuth from "../hooks/useAuth";



export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();


  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const errRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [user, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {


       dispatch(login({ user, pwd })).then((action) => {
        

        //set error messages if user or password is not set

        if (login.fulfilled.match(action)) {
          setAuth({ user, pwd, accessToken: action.payload.accessToken });
           navigate("/customize");
        } else{
        }});

        // if (!user) {
        //   setIsError((prev) => ({ ...prev, email: true }));
        //   emailRef.current?.focus();
        //   return;
        // }
        // if (!pwd) {
        //   setIsError((prev) => ({ ...prev, password: true }));
        //   errRef.current?.focus();
        //   return;
        // }


       
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev: any) => !prev);
  };


  useEffect(() => {
    localStorage.setItem("persist", persist.toString());
  }, [persist]);

  return (
    <section className="authSection">
      <form className="authContainer" onSubmit={handleSubmit}>
        <div>
          <div className="logoContainer">
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
                  error={isError.email}
                  errorMessage={errMsg}
                />
              </div>

              <div>
                <div className="inputcontainer">
                  <SBody className="label" text="Password" />
                  <InputField
                    placeholder="Enter your password"
                    img={password}
                    name="password"
                    type= { showPassword ? "text" : "password" }
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-describedby="pwdnote"
                    error={isError.password}
                    errorMessage={errMsg}
                    
                  />
                  <div 
                    onClick={() => setShowPassword(true)}
                    onMouseLeave={() => setShowPassword(false)}
                   >X</div>
                </div>
              </div>
            </div>
            <div className="buttoncontainer">
              <Button text="Login" isDisabled={(!user || !pwd ) ? true : false}  backgroundSubtype={(!user || !pwd ) ? "active" : "secondary"} />
            </div>

            <div className="questioncontainer">
              <MBody text={"Don't have an account?"} />
              <Link className="link-to" to={"/register"}>
                <MBody className="loginQuestion" text={"Create account"} />
              </Link>
            </div>

            <div className="persistCheck">
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor="persist">Trust This Device</label>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

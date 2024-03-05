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
import { useLoginFormValidation } from "../hooks/useFormValidation";
import {
  addNotification,
  removeNotification,
} from "../state/notification/notificationSlice";




export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const { errors, validateForm } = useLoginFormValidation();

  const dispatch = useDispatch<AppDispatch>();
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [user, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    emailRef.current?.focus();
  }, []);



  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isValid = validateForm(user, pwd);

    if (isValid) {
      try {
        dispatch(login({ user, pwd })).then((action: any) => {
          if (login.fulfilled.match(action)) {
            setAuth({ user, pwd, accessToken: action.payload.accessToken });
            navigate("/customize");
          } else {
            if (action.payload && action.payload.message === "Unauthorized") {
              dispatch(
                addNotification({
                  message:
                    "Login failed. Please check your details again and try again",
                  type: "error",
                  id: "unauthorizedlogin",
                })
              );

              setEmail("");
              setPwd("");

              setTimeout(() => {
                dispatch(removeNotification("unauthorizedlogin"));
              }, 6000);
            } else if (
              action?.payload &&
              action.payload.message === "No Server Response"
            ) {
              dispatch(
                addNotification({
                  message: "No server response, please try again later",
                  type: "error",
                  id: "noserverresponse",
                })
              );

              setTimeout(() => {
                dispatch(removeNotification("noserverresponse"));
              }, 6000);
            }
          }
        });
      } catch (err: any) {
        dispatch(
          addNotification({
            message: "An unexpected error occurred. Please try again later.",
            type: "error",
            id: "unexpectederror",
          })
        );

        setTimeout(() => {
          dispatch(removeNotification("unexpectederror"));
        }, 6000);
      }
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
            <Logo className="logo" size="large" />
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
                  aria-describedby="uidnote"
                  inputRef={emailRef}
                  autoComplete="off"
                  error={errors.email ? true : false}
                  errorMessage={errors.email}
                />
              </div>

              <div>
                <div className="inputcontainer">
                  <SBody className="label" text="Password" />
                  <InputField
                    placeholder="Enter your password"
                    img={password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    aria-describedby="pwdnote"
                    error={errors.password ? true : false}
                    errorMessage={errors.password !==
                      "Password must be at least 8 characters long"
                        ? errors.password
                        : ""}
                    passwordImg
                    handlePasswordClick={() => setShowPassword(true)}
                    handlePasswordLeave={() => setShowPassword(false)}
                    inputDataTestId="password-input"
                    
                  />
                </div>
              </div>
            </div>
            <div className="passwordcontain">
                  <SBody
                  className="passwordcontain-text"
                    text={
                      errors.password ===
                      "Password must be at least 8 characters long"
                        ? errors.password
                        : ""
                    }
                  />
                </div>
            <div className="buttoncontainer">
              <Button
              datatestid="login-button"
                text="Login"
                isDisabled={!user && !pwd ? true : false}
                backgroundSubtype={!user && !pwd ? "active" : "secondary"}
              />
            </div>

            <div className="persistCheck-container">
              <div className="persistCheck">
                <label className="persistLabel" htmlFor="persist">
                  Trust this device
                </label>
                <input
                  className="persistCheckbox"
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                />
              </div>
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
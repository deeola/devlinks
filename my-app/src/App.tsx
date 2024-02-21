import { useEffect } from "react";
import "./App.css";

// import Notification from "./components/notification/Notification";
import Customize from "./pages/Customize/Customize";
import Preview from "./pages/Preview/Preview";
import linkImage from "./assets/images/icon-link-copied-to-clipboard.svg";
import Auth from "./pages/Auth";
import Login from "./pages/Login";

import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import PrivateRoute from "./private/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../src/state/store";
import Profile from "./pages/Profile/Profile";

function App() {
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);
  //  const registerState = useSelector((state: RootState) => state.register);

  // const loggedInSuccess = authState.status === "succeeded"

   const loggedInSuccess = true;

  // useEffect(() => {
  //   if (loggedInSuccess) {
  //     console.log(authState);
  //     navigate("/customize");
  //   }
  // }, [loggedInSuccess, navigate, authState]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Auth />} />
         <Route
          path="/customize"
          element={
            <PrivateRoute isAuthenticated={loggedInSuccess}>
              <Customize />
            </PrivateRoute>
          }
        />
        <Route
          path="/preview"
          element={
            <PrivateRoute isAuthenticated={loggedInSuccess}>
              <Preview />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

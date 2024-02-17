import { useEffect } from "react";
import "./App.css";

// import Notification from "./components/notification/Notification";
import Customize from "./pages/Customize/Customize";
import Preview from "./pages/Preview/Preview";
import linkImage from "./assets/images/icon-link-copied-to-clipboard.svg"
import Auth from "./pages/Auth";
import Login from "./pages/Login";

import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import PrivateRoute from "./private/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../src/state/store";


function App() {

const navigate = useNavigate();
 const authState = useSelector((state: RootState) => state.auth);
//  const registerState = useSelector((state: RootState) => state.register);

const loggedInSuccess = authState.status === "succeeded" 




useEffect(() => {

  if (loggedInSuccess) {
    console.log(authState)
    navigate("/customize");

  }

},[loggedInSuccess, navigate, authState])

   

  return (
    <div className="App">
 <Routes>

<Route  path="/" element={<Login/>} />

 <Route path="/customize" element={
  <PrivateRoute isAuthenticated={loggedInSuccess}>
    <Customize />
  </PrivateRoute>
 } />

 <Route path="/preview" element={<Preview />} />
 <Route path="/register" element={<Auth/>} />  

 



</Routes>
    </div>
   
   
  );
}

export default App;

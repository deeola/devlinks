
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Customize from "./pages/Customize/Customize";
import Preview from "./pages/Preview/Preview";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../src/state/store";
import PrivateRoute from "./private/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import { selectAuthStatus } from "./state/user/authSlice";

function App() {


  const [myLocalStorageData, setMyLocalStorageData] = useState(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  

  const isAuthenticated = useSelector(selectAuthStatus);



  useEffect(() => {
    console.log("isAuthenticated on mount:", isAuthenticated);

    
    setTimeout(function() {
      localStorage.removeItem('isLoggedIn');
       setMyLocalStorageData(false); 
      
    }, 2 * 60 * 1000);


  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            myLocalStorageData || isAuthenticated === "succeeded" ? (
              <Navigate to="/customize" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/register" element={<Auth />} />
        <Route
          path="/customize"
          element={
            myLocalStorageData  ? (
              <Customize />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute

            />
          }
        >
          <Route path="/preview" element={<Preview />} />
        </Route>
      </Routes>

  
    </div>
  );
}

export default App;






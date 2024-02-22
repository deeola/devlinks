// App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Customize from "./pages/Customize/Customize";
import Preview from "./pages/Preview/Preview";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../src/state/store";
import PrivateRoute from "./private/PrivateRoute";

function App() {
  const [myLocalStorageData, setMyLocalStorageData] = useState(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.status === "succeeded"
  );

  useEffect(() => {

    console.log("myLocalStorageData on mount:", myLocalStorageData);

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
            myLocalStorageData && isAuthenticated ? (
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
              isAuthenticated={myLocalStorageData}
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

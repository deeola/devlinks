// App.js
import React, { useEffect } from "react";
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
  const isAuthenticated = useSelector((state: RootState) => state.auth.status === "succeeded");

useEffect(() => {
console.log(isAuthenticated)
},[isAuthenticated])


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ isAuthenticated  ?  <Navigate to="/customize" /> : <Login />} />
        <Route path="/register" element={<Auth />} />
        <Route  path="/customize" element={ isAuthenticated  ? <Customize />  : <Navigate to="/" />  }/> 
        <Route  path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
          <Route  path="/preview" element={<Preview />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;

// PrivateRoute.js
import React from "react";
import {  Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({isAuthenticated} : {isAuthenticated: boolean}) => {

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;

/* eslint-disable multiline-ternary */
// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuthStatus } from "../state/user/authSlice";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectAuthStatus);

  return isAuthenticated === "succeeded" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;

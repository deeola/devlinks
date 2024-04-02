/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  return (
    auth?.accessToken ? <div data-testid="myOutlet"> <Outlet />  </div> : <Navigate to="/" />);
};

export default RequireAuth;

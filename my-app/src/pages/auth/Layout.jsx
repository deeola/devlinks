/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
        <main className="App">
            <Outlet />
        </main>
  );
};

export default Layout;

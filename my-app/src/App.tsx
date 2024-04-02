/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Customize from "./pages/Customize/Customize";
import Preview from "./pages/Preview/Preview";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import PersistLogin from "./pages/auth/PersistLogin";
import Missing from "./pages/auth/Missing";
import RequireAuth from "./pages/auth/RequireAuth";

function App () {
  return (
    <Routes>
      <Route >
        <Route path="/" element={<Login/>} />
        <Route path="register" element={<Auth /> } />
        <Route element={ <PersistLogin /> } >
          <Route element={ <RequireAuth /> } >
            <Route path="customize" element={<Customize />} />
          </Route>
          <Route element={ <RequireAuth /> }>
            <Route path="preview" element={<Preview />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;

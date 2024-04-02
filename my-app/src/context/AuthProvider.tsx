/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { createContext, useState, type ReactNode, useContext } from "react";
import { type AuthData } from "../types";

const initialAuthContext: AuthData = {
  auth: {},
  setAuth: () => {},
  persist: false,
  setPersist: () => {}
};

const AuthContext = createContext<AuthData>(initialAuthContext);

export interface AuthProviderProps {
  children: ReactNode
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({ });
  const persistValue = localStorage.getItem("persist");
  // check here for persist value
  const [persist, setPersist] = useState<boolean>((persistValue != null) ? persistValue === "true" : false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;


import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react";
import { setNewUser } from "../state/user/authSlice";
import { access } from "fs";

// Define types for authentication data and context value
type AuthData = {
  auth: any;
  setAuth: Dispatch<SetStateAction<any>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
};

// Create context with initial empty values
const initialAuthContext: AuthData = {
  auth: {
    accessToken: "",
    username: ""
  },
  setAuth: () => {},
  persist: false,
  setPersist: () => {}
};

const AuthContext = createContext<AuthData>(initialAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [auth, setAuth] = useState({});
  const persistValue = localStorage.getItem("persist");

  console.log(persistValue, "persistValue")
  console.log(auth, "authircular" )

  
  const [persist, setPersist] = useState<boolean>(persistValue ? persistValue === "true" : false);
  


  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;



import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react";


type AuthData = {
  auth: any;
  setAuth: Dispatch<SetStateAction<any>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
};


const initialAuthContext: AuthData = {
  auth: {},
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

  const [persist, setPersist] = useState<boolean>(persistValue ? persistValue === "true" : false);
  


  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;



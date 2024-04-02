/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out");
  return useContext(AuthContext);
};

export default useAuth;

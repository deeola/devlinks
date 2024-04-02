/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => isMounted = false;
  }, []);

  return (
        <>
        {!persist ? <Outlet data-testid="outlet" /> : isLoading ? <p>Loading...</p> : <Outlet /> }
        </>
  );
};

export default PersistLogin;

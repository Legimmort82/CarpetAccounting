import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { apiGetCurrentUser } from "@/api/user";

const authContext = createContext<valueProp>({value:null});

const useAuthContext = () => {
  return useContext(authContext);
};
type AuthTypes={
  children :React.ReactNode
}
type valueProp={
  value :object | null
}

const AuthProvider = ({ children }:AuthTypes) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );

  const isLoggedIn = !!accessToken;

  const saveAccessToken = (token:string) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  const currentUsers =  useCallback ( async() => {
    if (isLoading) return;
    setIsLoading(true);
    // const result = await fetch("http//localhost");
    setCurrentUser(true);
    setIsLoading(false);
  },[isLoading]);

  useEffect(() => {
    if (isLoggedIn) {
      currentUsers()
      
    }
  }, [isLoggedIn,currentUsers]);

  const values = {
    logout,
    isLoggedIn,
    currentUser,
    saveAccessToken,
    isLoading,
    value:null,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuthContext };

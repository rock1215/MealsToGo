import React, { useState, createContext } from "react";
import {
  authChanged,
  loginRequest,
  logout,
  registerRequest,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "email@email.com",
    uid: "testtestest",
  });
  const [error, setError] = useState(null);

  authChanged((u) => {
    if (u) {
      console.log(u.uid);
      setUser(u);
      setIsLoading(false);
      setError(null);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    console.log(email, password);
    setIsLoading(true);
    setError(null);
    loginRequest(email, password)
      .then((u) => {
        setIsLoading(false);
        setUser(u);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError(null);
    registerRequest(email, password)
      .then((u) => {
        setUser(u);
        setError(null);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.toString());
        setIsLoading(false);
      });
  };

  const onLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

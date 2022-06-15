import React, { createContext, useState, useContext } from "react";

const loginContext = createContext();

export default LoginProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [whoIs, setWhoIs] = useState("");

  return (
    <loginContext.Provider value={{ isLogedIn, setIsLogedIn, whoIs, setWhoIs }}>
      {children}
    </loginContext.Provider>
  );
};

export const useLogin = () => useContext(loginContext);

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  const values = {
    user,
    setUser,
    handleLogin,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

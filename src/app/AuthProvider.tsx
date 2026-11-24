'use client';

import { ReactNode, useState, createContext, useCallback } from "react";

import { AuthContextType } from "../types/authentication";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider( { children } : { children: ReactNode} ){
  const [userID, setUserID] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    const response = await fetch("/api/validateSession");
    const data = await response.json();
    if (data.valid)
      setUserID(data.userID);
    else
      setUserID(null);
  }, [setUserID]);

  const logout = useCallback(async () =>{
    const response = await fetch("/api/logout");
    const data = await response.json();
    if (data.success === true)
      setUserID(null);
  }, [setUserID]);
  return (
    <AuthContext.Provider value={{
      userID,
      setUserID,
      refreshUser,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
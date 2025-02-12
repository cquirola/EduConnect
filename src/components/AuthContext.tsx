// src/components/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  authUser: string | null;
  role: string | null;
  login: (username: string, userRole: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<string | null>(localStorage.getItem("authUser"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("userRole"));

  const login = (username: string, userRole: string) => {
    setAuthUser(username);
    setRole(userRole);
    localStorage.setItem("authUser", username);
    localStorage.setItem("userRole", userRole);
  };

  const logout = () => {
    setAuthUser(null);
    setRole(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ authUser, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
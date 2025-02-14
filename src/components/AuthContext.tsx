import React, { createContext, useContext, useState, ReactNode } from "react";

// Definimos el tipo de dato para el contexto de autenticación (Admin o User)
interface AuthContextType {
  authUser: string | null;
  role: string | null;
  login: (username: string, userRole: string) => void;
  logout: () => void;
}

// Creamos el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creamos el proveedor de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // Inicializamos el estado del usuario autenticado y su rol, desde el localStorage.
  const [authUser, setAuthUser] = useState<string | null>(localStorage.getItem("authUser"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("userRole"));

  // Función para iniciar sesión, almacenando el usuario y su rol en el localStorage.
  const login = (username: string, userRole: string) => {
    setAuthUser(username);
    setRole(userRole);
    localStorage.setItem("authUser", username);
    localStorage.setItem("userRole", userRole);
  };

  // Función para cerrar sesión, actualizando el estado y removiendo los datos del localStorage.
  const logout = () => {
    setAuthUser(null);
    setRole(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("userRole");
  };

  //Proporcionamos el contexto de autenticación a los componentes hijos.
  return (
    <AuthContext.Provider value={{ authUser, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto de autenticación.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
// src/App.tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import {NavBar} from "./components/NavBar";
import {Home} from "./components/Home";
import {About} from "./components/About";
import {Login} from "./components/Login";
import Register from "./components/Register";
import {Dashboard} from "./components/Dashboard";
import Posts from "./components/Posts";
import Usuarios from "./components/Usuarios";
import {GestionUsuarios} from "./components/GestionUsuarios";
import theme from './components/teme';

// Componente funcional AppContent
const AppContent: React.FC = () => {
  // Obtener el usuario autenticado y el rol
  const { authUser, role } = useAuth();

  // Rutas de la aplicación y componentes a renderizar
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={!authUser ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/posts" element={authUser ? <Posts /> : <Navigate to="/login" />} />
        <Route path="/usuarios" element={authUser && role === "admin" ? <Usuarios /> : <Navigate to="/login" />} />
        <Route path="/gestion-usuarios" element={authUser && role === "admin" ? <GestionUsuarios /> : <Navigate to="/login" />} />
      </Routes>
    
    </>
  );
};

// Componente funcional App
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
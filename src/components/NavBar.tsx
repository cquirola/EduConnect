// src/components/NavBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

const NavBar: React.FC = () => {
  const { authUser, role, logout } = useAuth();

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          EduConnect
        </Typography>
        
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/about">Acerca de</Button>

        {authUser && role === "publicador" && (
          <Button color="inherit" component={Link} to="/posts">Publicaciones</Button>
        )}

        {authUser && role === "admin" && (
          <>
            <Button color="inherit" component={Link} to="/posts">Publicaciones</Button>
            <Button color="inherit" component={Link} to="/gestion-usuarios">Gestión de Usuarios</Button>
          </>
        )}

        {authUser ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">Bienvenido, {authUser}</Typography>
            <Button color="secondary" variant="contained" onClick={logout}>Cerrar Sesión</Button>
          </Box>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Iniciar Sesión</Button>
            <Button color="inherit" component={Link} to="/register">Crear Cuenta</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

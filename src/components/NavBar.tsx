import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

//Barra de navegación
export const NavBar: React.FC = () => {
  //Obtener el usuario autenticado y el rol
  const { authUser, role, logout } = useAuth();

  //Barra de navegación
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          <span style={{ color: "#FF69B4", fontSize: "1.5rem" }}>E</span>
          <span style={{ color: "#32CD32", fontSize: "1.5rem" }}>d</span>
          <span style={{ color: "#FFD700", fontSize: "1.5rem" }}>u</span>
          <span style={{ color: "#87CEEB", fontSize: "1.5rem" }}>C</span>
          <span style={{ color: "#FF69B4", fontSize: "1.5rem" }}>o</span>
          <span style={{ color: "#32CD32", fontSize: "1.5rem" }}>n</span>
          <span style={{ color: "#FFD700", fontSize: "1.5rem" }}>e</span>
          <span style={{ color: "#87CEEB", fontSize: "1.5rem" }}>c</span>
          <span style={{ color: "#FF69B4", fontSize: "1.5rem" }}>t</span>
        </Typography>

        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/about">Acerca de</Button>

        {/*Mostrar opciones de navegación según el rol del usuario*/}
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
          //Mostrar el nombre de usuario y opción para cerrar sesión
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1" sx={{ marginRight: 2 }}>Bienvenido, {authUser}</Typography>
            <Button color="secondary" variant="contained" onClick={logout}>Cerrar Sesión</Button>
          </Box>
        ) : (
          <>
            {/*Mostrar opciones de inicio de sesión y registro*/}
            <Button color="inherit" component={Link} to="/login">Iniciar Sesión</Button>
            <Button color="inherit" component={Link} to="/register">Crear Cuenta</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};



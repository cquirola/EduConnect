// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

// Definir la interfaz de usuario
interface Usuario {
  username: string;
  password: string;
  role: string;
}

// Estilos personalizados para el fondo
const Background = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: "url('https://i.pinimg.com/736x/b1/41/51/b1415137a5a362eba7792f612ff5e859.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

// Componente funcional Login/Iniciar Sesión
export const Login: React.FC = () => {
  // Hook para la navegación
  const navigate = useNavigate();
  // Hook para la autenticación
  const { login } = useAuth();

  // Estados para el nombre de usuario y contraseña
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Función para manejar el inicio de sesión
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Obtener los usuarios almacenados en localStorage
    const storedUsers = localStorage.getItem("usuarios");
    if (!storedUsers) {
      setError("No hay usuarios registrados.");
      return;
    }

    // Parsear los usuarios con la interfaz Usuario[]
    const users: Usuario[] = JSON.parse(storedUsers);

    // Buscar el usuario por nombre y contraseña
    const foundUser = users.find((user) => user.username === username && user.password === password);

    // Si se encuentra el usuario, iniciar sesión y redirigir a la página principal
    if (foundUser) {
      login(foundUser.username, foundUser.role); // Iniciar sesión correctamente
      navigate("/");
    } else {
      // Si no se encuentra, mostrar un mensaje de error
      setError("Usuario o contraseña incorrectos.");
    }
  };

  // Retornar el formulario de inicio de sesión
  return (
    <Background>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={4} bgcolor="rgba(255, 255, 255, 0.8)" borderRadius={2} boxShadow={3}>
          <Typography variant="h4" gutterBottom>
            Iniciar Sesión
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <TextField
              fullWidth
              margin="normal"
              label="Usuario"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>
          </form>
        </Box>
      </Container>
    </Background>
  );
};


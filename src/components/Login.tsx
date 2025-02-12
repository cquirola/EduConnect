// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

// Definir la interfaz de usuario
interface Usuario {
  username: string;
  password: string;
  role: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("usuarios");
    if (!storedUsers) {
      setError("No hay usuarios registrados.");
      return;
    }

    // Parsear los usuarios con la interfaz Usuario[]
    const users: Usuario[] = JSON.parse(storedUsers);

    // Buscar el usuario por nombre y contraseña
    const foundUser = users.find((user) => user.username === username && user.password === password);

    if (foundUser) {
      login(foundUser.username, foundUser.role); // Iniciar sesión correctamente
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" gutterBottom>
          Iniciar Sesión
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
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
  );
};

export default Login;
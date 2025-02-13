// src/components/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Paper,
} from "@mui/material";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("publicador");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!nombre || !apellido || !email || !username || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return;
    } else {
      setPasswordError("");
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const userExists = usuarios.some((user: Usuario) => user.username === username);

    if (userExists) {
      setUsernameError("El nombre de usuario ya está en uso.");
      return;
    } else {
      setUsernameError("");
    }

    const nuevoUsuario: Usuario = {
      id: usuarios.length + 1,
      nombre,
      apellido,
      email,
      username,
      password,
      role,
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: 'url("https://i.pinimg.com/736x/78/1c/39/781c39d0a3ad55c12916850d1d7c2825.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "auto",
        paddingTop: "60px",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            marginTop: "1rem",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#4A3728",
              textAlign: "center",
              mb: 3,
              fontWeight: "500",
            }}
          >
            Registro de Usuario
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)"
                }
              }}
            />
            <TextField
              fullWidth
              label="Apellido"
              variant="outlined"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)"
                }
              }}
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)"
                }
              }}
            />
            <TextField
              fullWidth
              label="Nombre de Usuario"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!usernameError}
              helperText={usernameError}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)"
                }
              }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)"
                }
              }}
            />
            <FormControl 
              fullWidth
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)"
                }
              }}
            >
              <InputLabel>Rol</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <MenuItem value="publicador">Publicador</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleRegister}
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                backgroundColor: "#8B7355",
                "&:hover": {
                  backgroundColor: "#6F5B3E",
                },
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Registrarse
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
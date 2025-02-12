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
  InputLabel
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

    // Validación del formato del correo
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      return;
    } else {
      setEmailError("");
    }

    // Validación de la contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return;
    } else {
      setPasswordError("");
    }

    // Validación de existencia de nombre de usuario
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
    <Container>
      <Typography variant="h4">Registro de Usuario</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        label="Nombre"
        variant="outlined"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Apellido"
        variant="outlined"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Correo Electrónico"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        fullWidth
        label="Nombre de Usuario"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        error={!!usernameError}
        helperText={usernameError}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        error={!!passwordError}
        helperText={passwordError}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Rol</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="publicador">Publicador</MenuItem>
          <MenuItem value="admin">Administrador</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={handleRegister} variant="contained" color="primary">
        Registrarse
      </Button>
    </Container>
  );
};

export default Register;

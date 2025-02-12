// src/components/GestionUsuarios.tsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuth } from "./AuthContext";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  role: string;
}

const GestionUsuarios: React.FC = () => {
  const { role } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState<Usuario | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [roleEdit, setRoleEdit] = useState("publicador");

  useEffect(() => {
    const storedUsuarios = localStorage.getItem("usuarios");
    if (storedUsuarios) {
      setUsuarios(JSON.parse(storedUsuarios));
    }
  }, []);

  const eliminarUsuario = (id: number) => {
    const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
  };

  const editarUsuario = (usuario: Usuario) => {
    setUsuarioEdit(usuario);
    setNombre(usuario.nombre);
    setApellido(usuario.apellido);
    setEmail(usuario.email);
    setRoleEdit(usuario.role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUsuarioEdit(null);
  };

  const handleSave = () => {
    if (usuarioEdit) {
      const updatedUsuarios = usuarios.map((usuario) =>
        usuario.id === usuarioEdit.id
          ? { ...usuario, nombre, apellido, email, role: roleEdit }
          : usuario
      );
      setUsuarios(updatedUsuarios);
      localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
      handleClose();
    }
  };

  if (role !== "admin") {
    return (
      <Typography variant="h6" color="error">
        Acceso denegado: Solo los administradores pueden gestionar usuarios.
      </Typography>
    );
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Typography variant="h4" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editarUsuario(usuario)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => eliminarUsuario(usuario.id)}
                    sx={{ ml: 1 }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Editar usuario */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
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
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select value={roleEdit} onChange={(e) => setRoleEdit(e.target.value)} >
              <MenuItem value="publicador">Publicador</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GestionUsuarios;

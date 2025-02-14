import React, { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

//Interfaz de usuario
interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  role: string;
}

//Componente funcional Usuarios
const Usuarios: React.FC = () => {
  //Lista de usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  //Obtener los usuarios almacenados en localStorage
  useEffect(() => {
    const storedUsuarios = localStorage.getItem("usuarios");
    if (storedUsuarios) {
      setUsuarios(JSON.parse(storedUsuarios));
    }
  }, []);

  //Retornar la tabla con la lista de usuarios
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Usuarios;

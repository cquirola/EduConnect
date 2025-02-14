import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useAuth } from "./AuthContext";
import Confetti from "react-confetti";

export const Dashboard: React.FC = () => {
  // Obtener el usuario autenticado y su rol
  const { authUser, role } = useAuth();
  const [showConfetti, setShowConfetti] = useState(true);

  // Mostrar confeti por 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Estilo para centrar el contenido
  // Mensaje de bienvenida y descripción de los permisos
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{
        textAlign: "center",
        position: "absolute", 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Container maxWidth="md">
        {showConfetti && <Confetti gravity={0.3} numberOfPieces={400} />}
        <Typography variant="h2" gutterBottom style={{ fontSize: "4rem" }}>
          Bienvenido, {authUser}
        </Typography>
        <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
          {role === "admin"
            ? "Tienes acceso a la gestión de usuarios y publicaciones."
            : "Puedes compartir publicaciones y participar en discusiones académicas."}
        </Typography>
      </Container>
    </Box>
  );
};


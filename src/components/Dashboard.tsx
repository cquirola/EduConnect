// src/components/Dashboard.tsx
import React from "react";
import { Container, Typography } from "@mui/material";
import { useAuth } from "./AuthContext";

const Dashboard: React.FC = () => {
  const { authUser, role } = useAuth();

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido, {authUser}
      </Typography>
      <Typography variant="body1">
        {role === "admin"
          ? "Tienes acceso a la gestión de usuarios y publicaciones."
          : "Puedes compartir publicaciones y participar en discusiones académicas."}
      </Typography>
    </Container>
  );
};

export default Dashboard;
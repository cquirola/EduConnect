// src/components/Home.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>
          Bienvenido a EduConnect
        </Typography>
        <Typography variant="h6" color="textSecondary" maxWidth="600px">
          EduConnect es una plataforma académica donde estudiantes y docentes
          pueden compartir publicaciones, interactuar y colaborar en un entorno
          educativo estructurado.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
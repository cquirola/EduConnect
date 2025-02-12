// src/components/About.tsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";

const About: React.FC = () => {
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
          Acerca de EduConnect
        </Typography>
        <Typography variant="h6" color="textSecondary" maxWidth="800px">
          EduConnect es una plataforma de red social académica que permite a
          estudiantes y docentes compartir conocimientos, realizar publicaciones
          y comentarios, y gestionar usuarios con roles diferenciados. Nuestra
          misión es fortalecer el aprendizaje colaborativo en un entorno digital
          seguro y organizado.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;

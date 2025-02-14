import React from "react";
import { Container, Typography, Box, CssBaseline } from "@mui/material";

export const Home: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box
      // Componente Box para el fondo de la página de inicio con imagen de fondo
        sx={{
          backgroundImage:
            'url("https://i.pinimg.com/736x/4d/11/99/4d1199b38bab8de3355ea6deacf6ffdf.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        
        <Container 
          maxWidth="md" 
          sx={{ 
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography 
          //Titulo de la página de inicio
            variant="h3" 
            gutterBottom
            sx={{
              color: "#4A3728", // Marrón oscuro para el título
              textShadow: "2px 2px 4px rgba(255,255,255,0.5)", // Sombra clara para contraste
              width: "100%",
              textAlign: "center",
              fontWeight: "bold", // Hacer el título más grueso
            }}
          >
            Bienvenido a EduConnect
          </Typography>
          <Typography 
          //Descripción de la página de inicio
            variant="h6"
            sx={{
              color: "#8B7355", // Marrón más claro para el texto secundario
              maxWidth: "600px",
              textShadow: "1px 1px 2px rgba(255,255,255,0.5)", // Sombra clara para contraste
              textAlign: "center",
              margin: "0 auto",
              fontWeight: "500", // Un poco más grueso para mejor legibilidad
            }}
          >
            EduConnect es una plataforma académica donde estudiantes y docentes
            pueden compartir publicaciones, interactuar y colaborar en un entorno
            educativo estructurado.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

// src/components/About.tsx
import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { deepOrange, deepPurple, green } from "@mui/material/colors";

// Componente estilizado para el fondo
const BackgroundContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',  
  top: 0,
  left: 0,
  height: '100vh',
  backgroundImage: `url('https://i.pinimg.com/736x/01/c8/40/01c8405c280fcfd058c562e05a1098f6.jpg')`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const About: React.FC = () => {
  return (
    <BackgroundContainer>
      <Container maxWidth="md">
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Acerca de EduConnect
        </Typography>
        
        <List sx={{ marginTop: 2, textAlign: 'center' }}>
          <ListItem>
            <ListItemText primary="Desarrollado por:" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Adriana Borja" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                C
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Camila Quirola" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: green[500] }}>
                G
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Genesis Tito" />
          </ListItem>
        </List>
      </Container>
    </BackgroundContainer>
  );
};

export default About;

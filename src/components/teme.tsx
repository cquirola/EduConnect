// src/components/theme.tsx
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8B7355", 
      light: "#A68B72", 
      dark: "#6F5B3E", 
      contrastText: "#ffffff", 
    },
    secondary: {
      main: "#D2B48C", 
      light: "#E8D1B3", 
      dark: "#A68B72",
      contrastText: "#000000",
    },
    background: {
      default: "#F5F5F5", 
      paper: "#ffffff", 
    },
    text: {
      primary: "#4A3728", 
      secondary: "#8B7355", 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Playfair Display", serif',
    h3: {
      fontWeight: 600,
      letterSpacing: "0.02em",
      color: "#4A3728", 
    },
    h4: {
      fontWeight: 500,
      letterSpacing: "0.01em",
      color: "#4A3728", 
    },
    h6: {
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#8B7355", 
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: "url(https://i.pinimg.com/736x/c8/3b/55/c83b555023f7ba3b753e4117a99b9d73.jpg)", // Fondo de imagen
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "collapse",
          "& th, & td": {
            padding: "12px 24px",
            borderBottom: "1px solid #ddd",
            textAlign: "left",
            backgroundColor: "#ffffff", 
            color: "#4A3728", 
          },
          "& th": {
            backgroundColor: "#8B7355", 
            color: "#fff", 
            fontWeight: "bold",
          },
          "& tr:hover": {
            backgroundColor: "#F5F5F5", 
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#3E2723", 
        },
      },
    },
  },
});

export default theme;

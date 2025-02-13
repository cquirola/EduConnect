# EduConnect

Autoras: Adriana Borja, Genesis Tito, Camila Quirola  
NRC: 1406

## Descripción

**EduConnect** es una plataforma académica donde estudiantes y docentes pueden compartir publicaciones, interactuar y colaborar en un entorno educativo estructurado. Esta aplicación web, desarrollada con React, TypeScript y Material UI, facilita la interacción y el intercambio de conocimientos, promoviendo un entorno de discusión en el ámbito académico.

## Características

- **Roles de usuario:**
  - **Publicador:** Puede crear publicaciones y comentarios.
  - **Administrador:** Puede eliminar publicaciones y comentarios, además de gestionar la lista de usuarios registrados.
  
- **Formulario de registro e inicio de sesión.**
- **Persistencia de datos:** La aplicación usa LocalStorage para almacenar la información de usuarios, publicaciones y comentarios, garantizando que la información persista al recargar la página.
- **Navegación:**
  - Página de inicio o bienvenida.
  - Página "Acerca de" con información del grupo.
  - Secciones de publicaciones y comentarios accesibles para ambos roles.
  - Sección exclusiva para el Administrador con la lista de usuarios.

## Instalación

Para instalar y ejecutar la aplicación, sigue estos pasos:

- **Inicializar el repositorio de Git:**

  - Ejecuta el siguiente comando:

    ```bash
    git init
    ```

- **Clonar el repositorio desde GitHub:**

  - Clona el repositorio usando este comando:

    ```bash
    git clone https://github.com/cquirola/EduConnect.git
    ```

- **Navegar al directorio del proyecto:**

  - Accede a la carpeta del proyecto:

    ```bash
    cd EduConnect
    ```

- **Instalar las dependencias necesarias:**

  Ejecuta los siguientes comandos para instalar las dependencias:

  - Instalar Material UI, Emotion y Styled:

    ```bash
    npm install @mui/material @emotion/react @emotion/styled
    ```

  - Instalar React Confetti:

    ```bash
    npm install react-confetti
    ```

  - Instalar Material Icons:

    ```bash
    npm install @mui/icons-material
    ```

- **Iniciar la aplicación:**

  Para iniciar la aplicación, ejecuta el siguiente comando:

  ```bash
  npm run dev

- **Si la instalación fue correcta:** 

Podrás ver la aplicación en el puerto correspondiente. Por ejemplo:

Local: http://localhost:5175/

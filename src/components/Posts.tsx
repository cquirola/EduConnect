
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { useAuth } from "./AuthContext";

//Interface de publicación y comentario
interface Post {
  id: number;
  author: string;
  content: string;
  comments?: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
}


//Componente funcional Publicaciones
const Posts: React.FC = () => {
  //Obtener el usuario autenticado y el rol
  const { authUser, role } = useAuth();
  //Lista de publicaciones
  const [posts, setPosts] = useState<Post[]>([]);
  //Estado para almacenar el contenido de la nueva publicación
  const [newPost, setNewPost] = useState<string>("");
  //Estado para almacenar los comentarios
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({});

  //Obtener las publicaciones almacenadas en localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  //Actualizar las publicaciones en localStorage
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  //Agregar una nueva publicación
  const handleAddPost = () => {
    if (newPost.trim() !== "") {
      const post: Post = {
        id: posts.length + 1,
        author: authUser || "Anónimo",
        content: newPost,
        comments: [],
      };
      const updatedPosts = [...posts, post];
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setNewPost("");
    }
  };

  //Eliminar una publicación
  const handleDeletePost = (id: number) => {
    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
    localStorage.setItem("posts", JSON.stringify(filteredPosts));
  };

  //Manejar el cambio en el campo de comentario
  const handleCommentChange = (postId: number, text: string) => {
    setCommentTexts((prev) => ({
      ...prev,
      [postId]: text,
    }));
  };

  //Agregar un comentario a una publicación
  const handleAddComment = (postId: number) => {
    const text = commentTexts[postId]?.trim();
    if (!text) return;

    //Actualizar la lista de publicaciones con el nuevo comentario
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: post.comments ? post.comments.length + 1 : 1,
          author: authUser || "Anónimo",
          text,
        };
        return { ...post, comments: [...(post.comments || []), newComment] };
      }
      return post;
    });

    //Actualizar el estado y almacenar en localStorage
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  //Retornar la lista de publicaciones
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Publicaciones
      </Typography>

      {authUser && (
        <>
          <TextField
            fullWidth
            label="Escribe una publicación..."
            variant="outlined"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleAddPost} variant="contained" color="primary" sx={{ mt: 1 }}>
            Publicar
          </Button>
        </>
      )}

      {/* Lista de publicaciones */}
      <List sx={{ width: "100%", mt: 3 }}>
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={post.author} src={"/src/avatars/avatar.png"} />
              </ListItemAvatar>
              <ListItemText
                primary={post.author}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {post.content}
                    </Typography>
                  </>
                }
              />
            </ListItem>

            {/* Sección de comentarios */}
            {post.comments && post.comments.length > 0 && (
              <List sx={{ pl: 4 }}>
                {post.comments.map((comment) => (
                  <ListItem key={comment.id} sx={{ pt: 0, pb: 0 }}>
                    <ListItemAvatar>
                      <Avatar alt={comment.author} src={"/src/avatars/avatar.png"} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.author}
                      secondary={
                        <Typography component="span" variant="body2">
                          {comment.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {/* Formulario para comentar */}
            {authUser && (
              <ListItem sx={{ pl: 4 }}>
                <TextField
                  fullWidth
                  label="Añadir un comentario..."
                  variant="outlined"
                  value={commentTexts[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  margin="normal"
                  size="small"
                />
                <Button
                  onClick={() => handleAddComment(post.id)}
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Comentar
                </Button>
              </ListItem>
            )}

            {/* Botón de eliminar (solo si el usuario es admin) */}
            {role === "admin" && (
              <ListItem>
                <Button variant="contained" color="secondary" onClick={() => handleDeletePost(post.id)}>
                  Eliminar
                </Button>
              </ListItem>
            )}

            {index < posts.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default Posts;

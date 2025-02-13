// src/components/Posts.tsx
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
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "./AuthContext";

interface Post {
  id: number;
  author: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
}

// Estilos personalizados
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#fff5ee',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const PostPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  transition: 'box-shadow 0.3s ease-in-out',
}));

const CommentSection = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(7),
  marginTop: theme.spacing(1),
}));

const Posts: React.FC = () => {
  const { authUser, role } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(), // ID único
        author: authUser || "Anónimo",
        content: newPost,
        comments: [],
      };
      setPosts([...posts, post]);
      setNewPost("");
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleCommentChange = (postId: number, text: string) => {
    setCommentTexts({ ...commentTexts, [postId]: text });
  };

  const handleAddComment = (postId: number) => {
    if (!commentTexts[postId]?.trim()) return;

    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            author: authUser || "Anónimo",
            text: commentTexts[postId],
          }],
        };
      }
      return post;
    }));
    setCommentTexts({ ...commentTexts, [postId]: "" });
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledPaper elevation={0}>
        <Typography variant="h4" gutterBottom sx={{ color: '#bf360c' }}>
          Publicaciones
        </Typography>

        {authUser && (
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Escribe una publicación..."
              variant="outlined"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              margin="normal"
              sx={{ '& .MuiOutlinedInput-input': { color: '#000' } }}
            />
            <Button 
              onClick={handleAddPost} 
              variant="contained" 
              sx={{ mt: 1, bgcolor: '#8b4513', '&:hover': { bgcolor: '#6b3410' } }}
            >
              Publicar
            </Button>
          </Paper>
        )}

        <List>
          {posts.map((post) => (
            <PostPaper key={post.id} elevation={2}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#125688' }}>{post.author[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography sx={{ color: '#125688', fontWeight: 'bold' }}>{post.author}</Typography>}
                  secondary={<Typography>{post.content}</Typography>}
                />
              </ListItem>

              {post.comments.length > 0 && (
                <CommentSection>
                  {post.comments.map((comment) => (
                    <ListItem key={comment.id} sx={{ py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#8b4513', width: 32, height: 32 }}>{comment.author[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="subtitle2" color="primary">{comment.author}</Typography>}
                        secondary={comment.text}
                      />
                    </ListItem>
                  ))}
                </CommentSection>
              )}

              {authUser && (
                <CommentSection>
                  <TextField
                    fullWidth
                    size="small"
                    label="Añadir un comentario..."
                    variant="outlined"
                    value={commentTexts[post.id] || ""}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    sx={{ '& .MuiOutlinedInput-input': { color: '#000' } }}
                  />
                  <Button
                    onClick={() => handleAddComment(post.id)}
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, bgcolor: '#8b4513', '&:hover': { bgcolor: '#6b3410' } }}
                  >
                    Comentar
                  </Button>
                </CommentSection>
              )}

              {role === "admin" && (
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleDeletePost(post.id)}
                  sx={{ ml: 2, mt: 1 }}
                >
                  Eliminar
                </Button>
              )}
            </PostPaper>
          ))}
        </List>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Posts;

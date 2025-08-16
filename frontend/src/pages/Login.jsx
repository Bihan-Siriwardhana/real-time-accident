// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Fade,
  Grid
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Login as LoginIcon
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom"; // React Router Link
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Username and password are required");
      setSuccess(false);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("username", formData.username);

      setError("");
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials, please try again"
      );
      setSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        p: 2
      }}
    >
      <Fade in={true} timeout={500}>
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 450,
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255, 255, 255, 0.18)"
          }}
        >
          <Box textAlign="center" mb={3}>
            <LoginIcon 
              color="primary" 
              sx={{ 
                fontSize: 60, 
                mb: 1,
                backgroundColor: '#e3f2fd',
                borderRadius: '50%',
                p: 1
              }} 
            />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: "bold", 
                color: "#1976d2",
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to access your emergency dashboard
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2.5 }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="medium"
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 1 }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="medium"
            />
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink
                  to="/forgot-password"
                  style={{
                    color: '#64b5f6', // light blue
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  Forgot password?
                </RouterLink>
              </Grid>
            </Grid>

            {error && (
              <Typography 
                color="error" 
                sx={{ 
                  mt: 2, 
                  mb: 2, 
                  textAlign: 'center',
                  fontWeight: 500,
                  backgroundColor: '#ffebee',
                  py: 1,
                  borderRadius: 1
                }}
              >
                {error}
              </Typography>
            )}
            
            {success && (
              <Typography 
                color="success.main" 
                sx={{ 
                  mt: 2,
                  mb: 2,
                  textAlign: 'center',
                  fontWeight: 500,
                  backgroundColor: '#e8f5e9',
                  py: 1,
                  borderRadius: 1
                }}
              >
                Login successful! Redirecting...
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                mt: 1,
                borderRadius: 50,
                fontWeight: 'bold',
                fontSize: 16,
                background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease'
              }}
              startIcon={<LoginIcon />}
            >
              LOGIN
            </Button>
          </form>
          
          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{' '}
              <RouterLink
                to="/signup"
                style={{
                  color: '#64b5f6', // light blue
                  textDecoration: 'none',
                  fontWeight: 600,
                  marginLeft: 4,
                }}
              >
                Sign Up
              </RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

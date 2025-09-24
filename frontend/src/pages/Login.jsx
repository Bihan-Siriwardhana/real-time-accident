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
import { Link as RouterLink, useNavigate } from "react-router-dom"; // React Router Link
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
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
      localStorage.setItem("role", res.data.data.role);

      setError("");
      setSuccess(true);
      
      // Navigate based on role
      setTimeout(() => {
        if (res.data.data.role === 'hospital') {
          navigate('/hospital/dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
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
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
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
            <Box 
              sx={{ 
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 32px rgba(220, 38, 38, 0.3)'
              }}
            >
              <Typography sx={{ fontSize: '2rem' }}>🚨</Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Emergency Access
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
              Secure login to emergency response system
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
                    color: '#dc2626',
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
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
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
                  color: '#dc2626',
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

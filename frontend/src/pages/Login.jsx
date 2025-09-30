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
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        p: 2
      }}
    >
      <Fade in={true} timeout={500}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 450,
            borderRadius: 4,
            background: "linear-gradient(145deg, #1e293b 0%, #334155 100%)",
            border: "2px solid rgba(6, 182, 212, 0.3)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
          }}
        >
          <Box textAlign="center" mb={3}>
            <Box 
              sx={{ 
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)'
              }}
            >
              <Typography sx={{ fontSize: '2rem' }}>🚑</Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800,
                color: 'white',
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', fontWeight: 500 }}>
              Sign in to RescueNet dashboard
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ 
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputBase-input': { color: 'white' }
              }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#06b6d4' }} />
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
              sx={{ 
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                  '&:hover fieldset': { borderColor: '#06b6d4' },
                  '&.Mui-focused fieldset': { borderColor: '#06b6d4' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputBase-input': { color: 'white' }
              }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#06b6d4' }} />
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
                    color: '#06b6d4',
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
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                border: '2px solid rgba(6, 182, 212, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(6, 182, 212, 0.4)',
                  borderColor: '#06b6d4'
                },
                transition: 'all 0.3s ease'
              }}
              startIcon={<LoginIcon />}
            >
              LOGIN
            </Button>
          </form>
          
          <Box textAlign="center" mt={3}>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Don't have an account?{' '}
              <RouterLink
                to="/signup"
                style={{
                  color: '#06b6d4',
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

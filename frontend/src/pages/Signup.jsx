// src/pages/Signup.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  InputAdornment,
  Grid,
  Fade
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  VerifiedUser as RoleIcon
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom"; // React Router Link

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const roles = [
    { value: "Hospital", label: "🏥 Hospital" },
    { value: "Police", label: "👮 Police" },
    { value: "Ambulance", label: "🚑 Ambulance" },
    { value: "Fire Department", label: "🔥 Fire Department" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError("");
      setSuccess("");
      await axios.post("http://localhost:5000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });
      setSuccess("Account created successfully! Redirecting to login...");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Redirect after 1.5s
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
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
            border: "2px solid rgba(139, 92, 246, 0.3)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
          }}
        >
          <Box textAlign="center" mb={3}>
            <Box 
              sx={{ 
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
              }}
            >
              <Typography sx={{ fontSize: '2rem' }}>🚑</Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ fontWeight: 800, color: "white", mb: 1 }}
            >
              Join RescueNet
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', fontWeight: 500 }}>
              Emergency response network registration
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
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                  '&:hover fieldset': { borderColor: '#8b5cf6' },
                  '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputBase-input': { color: 'white' }
              }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#8b5cf6' }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="medium"
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                  '&:hover fieldset': { borderColor: '#8b5cf6' },
                  '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputBase-input': { color: 'white' }
              }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#8b5cf6' }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="medium"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: '#8b5cf6' },
                      '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                    },
                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#8b5cf6' }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: '#8b5cf6' },
                      '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                    },
                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#8b5cf6' }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
            </Grid>

            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                  '&:hover fieldset': { borderColor: '#8b5cf6' },
                  '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputBase-input': { color: 'white' }
              }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RoleIcon sx={{ color: '#8b5cf6' }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="medium"
            >
              {roles.map((role, index) => (
                <MenuItem key={index} value={role.value} sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 10, fontSize: 20 }}>
                      {role.label.split(' ')[0]}
                    </span>
                    {role.label.split(' ').slice(1).join(' ')}
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            {error && (
              <Typography 
                color="error" 
                sx={{ mb: 2, textAlign: 'center', fontWeight: 500, backgroundColor: '#ffebee', py: 1, borderRadius: 1 }}
              >
                {error}
              </Typography>
            )}

            {success && (
              <Typography 
                color="success.main" 
                sx={{ mb: 2, textAlign: 'center', fontWeight: 500, backgroundColor: '#e8f5e9', py: 1, borderRadius: 1 }}
              >
                {success}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 2,
                mt: 1,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: 16,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)',
                  borderColor: '#10b981'
                },
                transition: 'all 0.3s ease'
              }}
            >
              🚀 CREATE ACCOUNT
            </Button>
          </form>

          <Box textAlign="center" mt={3}>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Already have an account?{' '}
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                sx={{
                  ml: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  color: '#8b5cf6',
                  '&:hover': {
                    color: '#a78bfa',
                    background: 'rgba(139, 92, 246, 0.1)'
                  }
                }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

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
            <Typography 
              variant="h4" 
              sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
            >
              Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Join our emergency response network
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
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
                  sx={{ mb: 2 }}
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
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
              </Grid>
            </Grid>

            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RoleIcon color="primary" />
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
            >
              SIGN UP
            </Button>
          </form>

          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                color="primary"
                sx={{
                  ml: 1,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Log In
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.role) {
      setError("All fields are required");
      return;
    }

    setError("");
    console.log("Login Data:", formData);

    // Later: Call backend API here for authentication
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />

          {/* Role Dropdown */}
          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </TextField>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ py: 1.2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

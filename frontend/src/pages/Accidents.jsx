// src/pages/AddAccident.jsx
import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function AddAccident() {
  const [formData, setFormData] = useState({ location: "", severity: "", date: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/accidents", formData);
      alert("Accident added successfully");
      setFormData({ location: "", severity: "", date: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ➕ Add Accident
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Location"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <TextField
          label="Severity"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.severity}
          onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
        />
        <TextField
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Accident
        </Button>
      </Box>
    </Container>
  );
}

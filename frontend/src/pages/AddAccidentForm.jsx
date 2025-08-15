import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const API_URL = "http://localhost:5000/api/accidents";

export default function AddAccidentForm() {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    total_people: "",
    injured_count: "",
    deceased_count: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Get JWT from login
      if (!token) {
        setMessage("You must log in first.");
        return;
      }

      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("✅ Accident created successfully!");
      setFormData({
        location: "",
        description: "",
        total_people: "",
        injured_count: "",
        deceased_count: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating accident");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add Accident
        </Typography>

        {message && (
          <Typography color={message.startsWith("✅") ? "green" : "red"} sx={{ mb: 2 }}>
            {message}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Location"
            name="location"
            fullWidth
            margin="normal"
            required
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label="Total People"
            name="total_people"
            type="number"
            fullWidth
            margin="normal"
            value={formData.total_people}
            onChange={handleChange}
          />
          <TextField
            label="Injured Count"
            name="injured_count"
            type="number"
            fullWidth
            margin="normal"
            value={formData.injured_count}
            onChange={handleChange}
          />
          <TextField
            label="Deceased Count"
            name="deceased_count"
            type="number"
            fullWidth
            margin="normal"
            value={formData.deceased_count}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

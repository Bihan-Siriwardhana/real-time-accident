import React, { useState, useEffect } from "react";
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
    accident_date: "",
    location: "",
    severity_level: "",
    description: "",
    latitude: "",
    longitude: "",
    image_url: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Auto-detect location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
        },
        (err) => {
          console.error("Location error:", err);
          setMessage("⚠️ Could not fetch location. Please allow location access.");
        }
      );
    } else {
      setMessage("⚠️ Geolocation not supported in this browser.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // JWT token
      if (!token) {
        setMessage("❌ Please log in first.");
        return;
      }

      await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("✅ Accident created successfully!");
      setFormData({
        accident_date: "",
        location: "",
        severity_level: "",
        description: "",
        latitude: formData.latitude, // keep auto-detected coords
        longitude: formData.longitude,
        image_url: "",
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
          <Typography
            color={message.startsWith("✅") ? "green" : "red"}
            sx={{ mb: 2 }}
          >
            {message}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Accident Date"
            name="accident_date"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={formData.accident_date}
            onChange={handleChange}
            required
          />
          <TextField
            label="Location (Address)"
            name="location"
            fullWidth
            margin="normal"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            label="Severity Level"
            name="severity_level"
            fullWidth
            margin="normal"
            value={formData.severity_level}
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
            label="Image URL"
            name="image_url"
            fullWidth
            margin="normal"
            value={formData.image_url}
            onChange={handleChange}
          />

          {/* ✅ Display auto-detected latitude & longitude */}
          <TextField
            label="Latitude"
            name="latitude"
            fullWidth
            margin="normal"
            value={formData.latitude}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Longitude"
            name="longitude"
            fullWidth
            margin="normal"
            value={formData.longitude}
            InputProps={{ readOnly: true }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>

        {/* ✅ Google Map Preview */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Accident Location Map</Typography>
          {formData.latitude && formData.longitude ? (
            <iframe
              title="Google Map"
              width="100%"
              height="300"
              style={{ border: 0, marginTop: "10px", borderRadius: "10px" }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}&hl=en&z=14&output=embed`}
            ></iframe>
          ) : (
            <Typography color="textSecondary">
              📍 Location not available
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

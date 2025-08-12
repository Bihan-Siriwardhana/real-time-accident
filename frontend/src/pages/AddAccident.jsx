import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function AddAccident() {
  const [formData, setFormData] = useState({
    accidentDate: "",
    location: "",
    severity: "",
    deaths: "",
    patientsInHospital: "",
    totalPeople: "", // ✅ new
    hospitalName: "",
    description: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const severities = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" },
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("accident_date", formData.accidentDate);
    data.append("location", formData.location);
    data.append("severity_level", formData.severity);
    data.append("description", formData.description);
    data.append("deaths", formData.deaths || 0);
    data.append("patients_in_hospital", formData.patientsInHospital || 0);
    data.append("total_people", formData.totalPeople || 0); // ✅ send to backend
    data.append("hospital_name", formData.hospitalName);
    data.append("latitude", 0);
    data.append("longitude", 0);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:5000/create-accident", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("✅ Accident added successfully!");
      setFormData({
        accidentDate: "",
        location: "",
        severity: "",
        deaths: "",
        patientsInHospital: "",
        totalPeople: "",
        hospitalName: "",
        description: ""
      });
      setImageFile(null);
    } catch (error) {
      console.error("❌ Error saving accident:", error);
      alert("Failed to save accident data");
    }
  };

  return (
    <Box mt={5} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Add Accident Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Accident Date & Time"
            name="accidentDate"
            type="datetime-local"
            value={formData.accidentDate}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            select
            fullWidth
            label="Severity Level"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          >
            {severities.map((s, i) => (
              <MenuItem key={i} value={s.value}>{s.label}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Number of Deaths"
            name="deaths"
            type="number"
            value={formData.deaths}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Number of Patients in Hospital"
            name="patientsInHospital"
            type="number"
            value={formData.patientsInHospital}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Total People Involved"
            name="totalPeople"
            type="number"
            value={formData.totalPeople}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Hospital Name"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            style={{ marginBottom: "16px" }}
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit Accident
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

// AccidentEditPage.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function AccidentEditPage() {
  const { id } = useParams(); // ✅ Get accident id from URL

  // Dummy accident list
  const dummyAccidents = [
    {
      id: 1,
      date: "2025-08-10",
      location: "Colombo",
      patients: [
        { id: 1, name: "John Doe", hospital: "Colombo General Hospital" },
        { id: 2, name: "Jane Smith", hospital: "National Hospital" },
      ],
      deadBodies: [
        { id: 1, hospital: "National Hospital" },
        { id: 2, hospital: "Colombo General Hospital" },
      ],
    },
    {
      id: 2,
      date: "2025-08-09",
      location: "Kandy",
      patients: [{ id: 3, name: "Mark Lee", hospital: "Kandy General" }],
      deadBodies: [{ id: 3, hospital: "Kandy General" }],
    },
  ];

  const [accident, setAccident] = useState(null);
  const [newPatient, setNewPatient] = useState({ name: "", hospital: "" });
  const [newBody, setNewBody] = useState({ hospital: "" });

  // Load accident data based on id
  useEffect(() => {
    const found = dummyAccidents.find((a) => a.id === parseInt(id));
    setAccident(found || null);
  }, [id]);

  const handleAddPatient = () => {
    if (newPatient.name.trim() && newPatient.hospital.trim()) {
      setAccident((prev) => ({
        ...prev,
        patients: [
          ...prev.patients,
          { id: Date.now(), name: newPatient.name, hospital: newPatient.hospital },
        ],
      }));
      setNewPatient({ name: "", hospital: "" });
    }
  };

  const handleAddBody = () => {
    if (newBody.hospital.trim()) {
      setAccident((prev) => ({
        ...prev,
        deadBodies: [...prev.deadBodies, { id: Date.now(), hospital: newBody.hospital }],
      }));
      setNewBody({ hospital: "" });
    }
  };

  if (!accident) {
    return <Typography variant="h6">Accident not found.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Accident #{accident.id}
      </Typography>

      {/* Accident Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Accident Details</Typography>
          <Typography>Date: {accident.date}</Typography>
          <Typography>Location: {accident.location}</Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {/* Patients */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Patients</Typography>
              <Divider sx={{ my: 1 }} />
              {accident.patients.map((p) => (
                <Box key={p.id} sx={{ p: 1, border: "1px solid #ddd", borderRadius: 1, mb: 1 }}>
                  <Typography>Name: {p.name}</Typography>
                  <Typography>Hospital: {p.hospital}</Typography>
                </Box>
              ))}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Add New Patient
              </Typography>
              <TextField
                label="Patient Name"
                fullWidth
                size="small"
                value={newPatient.name}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, name: e.target.value }))}
                sx={{ my: 1 }}
              />
              <TextField
                label="Hospital Name"
                fullWidth
                size="small"
                value={newPatient.hospital}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, hospital: e.target.value }))}
                sx={{ mb: 1 }}
              />
              <Button variant="contained" fullWidth onClick={handleAddPatient}>
                Add Patient
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Dead Bodies */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dead Bodies</Typography>
              <Divider sx={{ my: 1 }} />
              {accident.deadBodies.map((b) => (
                <Box key={b.id} sx={{ p: 1, border: "1px solid #ddd", borderRadius: 1, mb: 1 }}>
                  <Typography>Hospital: {b.hospital}</Typography>
                </Box>
              ))}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Add New Body
              </Typography>
              <TextField
                label="Hospital Name"
                fullWidth
                size="small"
                value={newBody.hospital}
                onChange={(e) => setNewBody({ hospital: e.target.value })}
                sx={{ mb: 1, mt: 1 }}
              />
              <Button variant="contained" fullWidth onClick={handleAddBody}>
                Add Body
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

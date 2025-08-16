// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

export default function HomePage() {
  const [accidents, setAccidents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token if required
        const res = await axios.get("http://localhost:5000/api/accidents", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", res.data);

        // Handle cases where the API returns an object with array inside 'data'
        const accidentArray = Array.isArray(res.data)
          ? res.data
          : res.data.data;

        setAccidents(accidentArray || []);
      } catch (err) {
        console.error("Error fetching accidents:", err);
        setError("Failed to load accident data");
      }
    };

    fetchAccidents();
  }, []);

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Accident Reports
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {accidents.length === 0 && !error && (
          <Typography>No accidents found.</Typography>
        )}

        {accidents.map((accident, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Location: {accident.location}
                </Typography>
                <Typography variant="body2">
                  Date: {accident.accident_date}
                </Typography>
                <Typography variant="body2">
                  Severity: {accident.severity_level}
                </Typography>
                {accident.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {accident.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

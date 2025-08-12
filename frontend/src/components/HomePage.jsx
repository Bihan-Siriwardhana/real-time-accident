import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/accidents")
      .then((res) => {
        setAccidents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching accidents:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editaccident/${id}`);
  };

  const handleAdd = () => {
    navigate("/addaccident");
  };

  return (
    <Box p={3}>
      {/* Add Accident Button */}
      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add New Accident
        </Button>
      </Box>

      {/* Accident Cards */}
      <Grid container spacing={3}>
        {accidents.map((accident) => (
          <Grid item xs={12} sm={6} md={4} key={accident._id}>
            <Card>
              {/* Display photo if available */}
              {accident.image_url && (
                <Box
                  component="img"
                  src={accident.image_url}
                  alt={`Accident at ${accident.location}`}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                  }}
                />
              )}

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📍 {accident.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date:{" "}
                  {accident.accident_date
                    ? new Date(accident.accident_date).toLocaleString()
                    : "N/A"}
                </Typography>
                <Typography variant="body2">
                  Total People: {accident.total_people || 0}
                </Typography>
                <Typography variant="body2">
                  Admitted: {accident.patients_in_hospital || 0}
                </Typography>
                <Typography variant="body2">
                  Deaths: {accident.deaths || 0}
                </Typography>
                <Typography variant="body2">
                  Hospital: {accident.hospital_name || "N/A"}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEdit(accident._id)}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;

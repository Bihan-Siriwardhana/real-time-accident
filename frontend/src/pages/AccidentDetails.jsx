import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";

export default function AccidentDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const accident = location.state?.accident;

  const [search, setSearch] = useState("");

  if (!accident) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          No accident data found.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  const filteredPeople = accident.people.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🚨 Accident Details - {accident.location}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Date: {new Date(accident.date).toLocaleDateString()}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <TextField
        label="Search Patient"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <List>
        {filteredPeople.map((person, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={`${person.name} — ${person.status}`}
              secondary={
                person.status === "Admitted"
                  ? `🏥 ${person.hospital} | ${person.ward || "No Ward"} / ${
                      person.bed || "No Bed"
                    }`
                  : `🏥 ${person.hospital} | Deceased`
              }
            />
          </ListItem>
        ))}
      </List>

      <Button variant="outlined" sx={{ mt: 3 }} onClick={() => navigate("/")}>
        Back to Dashboard
      </Button>
    </Container>
  );
}

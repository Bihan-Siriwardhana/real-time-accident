// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🚨 Accident Tracker
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/search">
          Search Person
        </Button>

        {/* Auth Buttons */}
        <Button
          color="inherit"
          component={Link}
          to="/signup"
          sx={{ ml: 2, border: "1px solid white", borderRadius: 2 }}
        >
          Sign Up
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{
            ml: 1,
            backgroundColor: "white",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.9)",
            },
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

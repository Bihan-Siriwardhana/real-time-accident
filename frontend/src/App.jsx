// App.jsx
import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#fefefe",
      }}
    >
      <Navbar />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="lg">
          <AppRouter />
        </Container>
      </Box>

      {/* Optional Footer */}
      <Box
        component="footer"
        sx={{ py: 2, textAlign: "center", bgcolor: "#fafafa" }}
      >
        <small>&copy; {new Date().getFullYear()} Accident Alert System</small>
      </Box>
    </Box>
  );
};

export default App;

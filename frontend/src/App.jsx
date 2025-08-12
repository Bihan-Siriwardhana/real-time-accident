// App.jsx — remove Router
import React from "react";
import { Routes, Route } from "react-router-dom"; // Only import these
import { Container, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ReportAccident from "./pages/Accidents";
import AccidentDetails from "./pages/AccidentDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomePage from "./components/HomePage";
import AddAccident from "./pages/AddAccident";
import AccidentEditPage from "./components/EditAccident";

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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<ReportAccident />} />
            <Route path="/accident/:id" element={<AccidentDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/addaccident" element={<AddAccident />} />
            <Route path="/editaccident/:id" element={<AccidentEditPage />} />
          </Routes>
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

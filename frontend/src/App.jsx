import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ReportAccident from "./pages/Accidents";
import AccidentDetails from "./pages/AccidentDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#fefefe' }}>
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
            </Routes>
          </Container>
        </Box>

        {/* Optional Footer */}
        <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: '#fafafa' }}>
          <small>&copy; {new Date().getFullYear()} Accident Alert System</small>
        </Box>
      </Box>
    
  );
};

export default App;

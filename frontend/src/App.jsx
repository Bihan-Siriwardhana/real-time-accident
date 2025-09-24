import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Box component="main">
        <AppRouter />
      </Box>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Box
          sx={{ 
            py: 4, 
            textAlign: "center", 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#64748b',
              fontWeight: 600
            }}
          >
            © {new Date().getFullYear()} RescueNet - Advanced Emergency Response Platform
          </Typography>
        </Box>
      </motion.footer>
    </Box>
  );
};

export default App;

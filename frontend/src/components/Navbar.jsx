import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {

  return (
    <Box 
      sx={{ 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        px: 4,
        py: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', mx: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box 
              sx={{ 
                width: 50,
                height: 50,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}
            >
              🚑
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1
                }}
              >
                RescueNet
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                Emergency Response System
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <Button
              component={Link}
              to="/"
              sx={{
                borderRadius: '12px',
                px: 3,
                py: 1,
                color: '#64748b',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: '#6366f1',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              🏠 Home
            </Button>
            
            <Button
              component={Link}
              to="/dashboard"
              sx={{
                borderRadius: '12px',
                px: 3,
                py: 1,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              📊 Dashboard
            </Button>
            
            <Button
              component={Link}
              to="/accidents"
              sx={{
                borderRadius: '12px',
                px: 3,
                py: 1,
                color: '#64748b',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              🚨 Incidents
            </Button>
            
            <Button 
              component={Link} 
              to="/login"
              sx={{ 
                borderRadius: '12px',
                px: 3,
                py: 1,
                border: '2px solid #e2e8f0',
                color: '#64748b',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#6366f1',
                  color: '#6366f1',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Login
            </Button>
            
            <Button 
              component={Link} 
              to="/signup"
              sx={{
                borderRadius: '12px',
                px: 3,
                py: 1,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Sign Up
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}

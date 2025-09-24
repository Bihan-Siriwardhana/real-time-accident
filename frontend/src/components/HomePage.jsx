import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const features = [
    {
      icon: "🚨",
      title: "Real-time Alerts",
      description: "Instant notifications for emergency incidents with precise location tracking"
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Comprehensive data visualization and incident management tools"
    },
    {
      icon: "🏥",
      title: "Hospital Network",
      description: "Seamless coordination with medical facilities and emergency services"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.3)'
          }} 
        />
        
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 4, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 900,
                    color: 'white',
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.1
                  }}
                >
                  Emergency Response
                  <Box component="span" sx={{ display: 'block', color: '#fbbf24' }}>
                    Made Simple
                  </Box>
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}
                >
                  Advanced incident tracking and coordination platform for emergency services, 
                  hospitals, and first responders.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/dashboard"
                    size="large"
                    sx={{
                      borderRadius: '16px',
                      px: 4,
                      py: 2,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📊 View Dashboard
                  </Button>
                  
                  <Button
                    component={Link}
                    to="/accidents"
                    size="large"
                    variant="outlined"
                    sx={{
                      borderRadius: '16px',
                      px: 4,
                      py: 2,
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white',
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🚨 Active Incidents
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box 
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    p: 4,
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 3, textAlign: 'center' }}>
                    🚑 RescueNet
                  </Typography>
                  
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ fontSize: '1.5rem' }}>⚡</Box>
                      <Typography sx={{ color: 'white', fontWeight: 500 }}>Real-time incident tracking</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ fontSize: '1.5rem' }}>🎯</Box>
                      <Typography sx={{ color: 'white', fontWeight: 500 }}>Precise location mapping</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ fontSize: '1.5rem' }}>🤝</Box>
                      <Typography sx={{ color: 'white', fontWeight: 500 }}>Multi-agency coordination</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ fontSize: '1.5rem' }}>📱</Box>
                      <Typography sx={{ color: 'white', fontWeight: 500 }}>Mobile-first design</Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, background: 'white' }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Powerful Features
              </Typography>
              <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500 }}>
                Everything you need for effective emergency response management
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Card 
                    className="card-modern"
                    sx={{ 
                      height: '100%',
                      textAlign: 'center',
                      border: '1px solid #e2e8f0',
                      '&:hover': {
                        borderColor: '#6366f1',
                        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ fontSize: '3rem', mb: 2 }}>{feature.icon}</Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          color: '#1e293b',
                          mb: 2
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#64748b',
                          lineHeight: 1.6,
                          fontWeight: 500
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 8,
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          textAlign: 'center'
        }}
      >
        <Box sx={{ maxWidth: '800px', mx: 'auto', px: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                color: 'white',
                mb: 3
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 4,
                fontWeight: 400
              }}
            >
              Join thousands of emergency responders using RescueNet to save lives every day.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/signup"
                size="large"
                sx={{
                  borderRadius: '16px',
                  px: 4,
                  py: 2,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                🚀 Get Started Free
              </Button>
              
              <Button
                component={Link}
                to="/login"
                size="large"
                variant="outlined"
                sx={{
                  borderRadius: '16px',
                  px: 4,
                  py: 2,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                👤 Sign In
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}

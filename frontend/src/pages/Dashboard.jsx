import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  CardMedia,
  Box,
  Avatar,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  LocationOn,
  DateRange,
  People,
  LocalHospital,
  Healing,
  Warning,
  Visibility,
  Close,
  Person,
  Bed,
  Home,
  SentimentVeryDissatisfied
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const StatusChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  fontWeight: 500
}));

const HospitalChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  fontWeight: 500,
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.dark,
  '&:hover': {
    backgroundColor: theme.palette.success.main,
    color: 'white'
  }
}));

const ViewButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 20,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[2]
  }
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginTop: theme.spacing(1)
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const [accidents, setAccidents] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    // Enhanced dummy data with more details
    const dummyData = [
      {
        id: 1,
        location: "Colombo - Galle Road",
        date: "2025-08-03T10:00:00.000Z",
        photo: "https://images.unsplash.com/photo-1582732970804-906e2a81d7f3?w=300&auto=format&fit=crop",
        severity: "High",
        people: [
          { id: 101, name: "John Perera", age: 32, status: "Admitted", hospital: "National Hospital Colombo", ward: "Emergency Ward", bed: "Bed 12", condition: "Serious" },
          { id: 102, name: "Sara Fernando", age: 28, status: "Admitted", hospital: "National Hospital Colombo", ward: "Emergency Ward", bed: "Bed 14", condition: "Stable" },
          { id: 103, name: "Michael Silva", age: 45, status: "Deceased", hospital: "National Hospital Colombo" },
          { id: 104, name: "Anusha Kumari", age: 24, status: "Admitted", hospital: "Asiri Hospital", ward: "Ward 2", bed: "Bed 8", condition: "Critical" }
        ]
      },
      {
        id: 2,
        location: "Kandy - Peradeniya Road",
        date: "2025-08-02T14:30:00.000Z",
        photo: "https://images.unsplash.com/photo-1582732970804-906e2a81d7f3?w=300&auto=format&fit=crop",
        severity: "Medium",
        people: [
          { id: 201, name: "Nimal Perera", age: 40, status: "Admitted", hospital: "Kandy General Hospital", ward: "Ward 3", bed: "Bed 10", condition: "Stable" },
          { id: 202, name: "Ravi Jayasinghe", age: 35, status: "Deceased", hospital: "Kandy General Hospital" },
          { id: 203, name: "Priyanka Bandara", age: 22, status: "Admitted", hospital: "Kandy General Hospital", ward: "ICU", bed: "Bed 5", condition: "Critical" }
        ]
      },
      {
        id: 3,
        location: "Galle - Matara Road",
        date: "2025-08-01T08:15:00.000Z",
        photo: "https://images.unsplash.com/photo-1582732970804-906e2a81d7f3?w=300&auto=format&fit=crop",
        severity: "Low",
        people: [
          { id: 301, name: "Sunil Gamage", age: 50, status: "Admitted", hospital: "Karapitiya Hospital", ward: "Ward 1", bed: "Bed 3", condition: "Minor" },
          { id: 302, name: "Kamala Wijesekara", age: 60, status: "Admitted", hospital: "Karapitiya Hospital", ward: "Ward 1", bed: "Bed 4", condition: "Stable" }
        ]
      }
    ];
    setAccidents(dummyData);
  }, []);

  const handleHospitalClick = (hospitalName) => {
    let admitted = [];
    let deceased = [];

    accidents.forEach(accident => {
      accident.people.forEach(person => {
        if (person.hospital === hospitalName) {
          if (person.status === "Admitted") admitted.push(person);
          if (person.status === "Deceased") deceased.push(person);
        }
      });
    });

    setSelectedHospital({
      name: hospitalName,
      admittedCount: admitted.length,
      admittedList: admitted,
      deceasedCount: deceased.length,
      deceasedList: deceased
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'info';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'critical': return 'error';
      case 'serious': return 'warning';
      case 'stable': return 'info';
      case 'minor': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <Box sx={{ py: 6 }}>
        <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  color: 'white',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Box 
                  sx={{ 
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '16px',
                    p: 2,
                    fontSize: '2rem'
                  }}
                >
                  📊
                </Box>
                Emergency Analytics
              </Typography>
              <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 500, ml: 8 }}>
                Real-time incident monitoring and response coordination
              </Typography>
            </Box>
          </motion.div>
      
        <Grid container spacing={4}>
        {accidents.map((accident) => {
          const uniqueHospitals = [...new Set(accident.people.map(p => p.hospital).filter(Boolean))];
          const totalPeople = accident.people.length;
          const totalDeaths = accident.people.filter(p => p.status === "Deceased").length;
          const totalAdmitted = accident.people.filter(p => p.status === "Admitted").length;
          const admissionPercentage = (totalAdmitted / totalPeople) * 100;
          const deathPercentage = (totalDeaths / totalPeople) * 100;

          return (
            <Grid item xs={12} md={6} lg={4} key={accident.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: accident.id * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
                    border: `2px solid ${getSeverityColor(accident.severity)}40`,
                    borderRadius: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: getSeverityColor(accident.severity),
                      boxShadow: `0 20px 40px ${getSeverityColor(accident.severity)}30`
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '6px',
                      background: `linear-gradient(90deg, ${getSeverityColor(accident.severity)} 0%, ${getSeverityColor(accident.severity)}80 100%)`
                    }
                  }}>
                <Box sx={{ display: "flex", height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            color: 'white',
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          📍 {accident.location}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                          {new Date(accident.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Typography>
                      </Box>
                      <Chip 
                        label={accident.severity}
                        sx={{ 
                          background: getSeverityColor(accident.severity),
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '12px',
                          borderRadius: '12px',
                          boxShadow: `0 4px 12px ${getSeverityColor(accident.severity)}40`
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box 
                        sx={{ 
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: 2,
                          mb: 3
                        }}
                      >
                        <Box 
                          sx={{ 
                            textAlign: 'center',
                            p: 3,
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                            borderRadius: '16px',
                            border: '2px solid #06b6d4',
                            boxShadow: '0 8px 32px rgba(6, 182, 212, 0.2)'
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: 800, color: '#06b6d4', mb: 0.5 }}>
                            {totalPeople}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                            Total People
                          </Typography>
                        </Box>
                        
                        <Box 
                          sx={{ 
                            textAlign: 'center',
                            p: 3,
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                            borderRadius: '16px',
                            border: '2px solid #10b981',
                            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)'
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: 800, color: '#10b981', mb: 0.5 }}>
                            {totalAdmitted}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                            Admitted
                          </Typography>
                        </Box>
                        
                        <Box 
                          sx={{ 
                            textAlign: 'center',
                            p: 3,
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                            borderRadius: '16px',
                            border: '2px solid #ef4444',
                            boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)'
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: 800, color: '#ef4444', mb: 0.5 }}>
                            {totalDeaths}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                            Deceased
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    {uniqueHospitals.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#e2e8f0', mb: 2 }}>
                          🏥 Hospitals Involved:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {uniqueHospitals.map((hospital, i) => (
                            <Chip
                              key={i}
                              label={hospital}
                              clickable
                              onClick={() => handleHospitalClick(hospital)}
                              sx={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '11px',
                                border: '1px solid #f59e0b40',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)',
                                  borderColor: '#f59e0b'
                                },
                                transition: 'all 0.3s ease'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    <Button
                      fullWidth
                      onClick={() =>
                        navigate(`/accident/${accident.id}`, {
                          state: { accident }
                        })
                      }
                      sx={{
                        borderRadius: '16px',
                        py: 2,
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1rem',
                        textTransform: 'none',
                        border: '2px solid #8b5cf640',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 12px 30px rgba(139, 92, 246, 0.4)',
                          borderColor: '#8b5cf6'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      🔍 View Full Details
                    </Button>
                  </CardContent>
                </Box>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
          </Grid>
        </Box>
      </Box>

      {/* Hospital Detail Dialog */}
      <Dialog 
        open={!!selectedHospital} 
        onClose={() => setSelectedHospital(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ 
          backgroundColor: (theme) => theme.palette.primary.main,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalHospital sx={{ mr: 1 }} />
            {selectedHospital?.name}
          </Box>
          <IconButton onClick={() => setSelectedHospital(null)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            textAlign: 'center',
            mb: 3,
            p: 2,
            backgroundColor: (theme) => theme.palette.grey[100],
            borderRadius: 2
          }}>
            <Box>
              <Typography variant="h6" color="primary">{selectedHospital?.admittedCount || 0}</Typography>
              <Typography variant="body2">Admitted Patients</Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="error">{selectedHospital?.deceasedCount || 0}</Typography>
              <Typography variant="body2">Deceased</Typography>
            </Box>
          </Box>
          
          {selectedHospital?.admittedList.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Healing color="primary" sx={{ mr: 1 }} /> Admitted Patients
              </Typography>
              <List dense>
                {selectedHospital.admittedList.map((patient) => (
                  <ListItem key={patient.id} sx={{ 
                    mb: 1, 
                    backgroundColor: (theme) => theme.palette.action.hover,
                    borderRadius: 1
                  }}>
                    <Avatar sx={{ 
                      mr: 2, 
                      backgroundColor: (theme) => theme.palette.primary.light,
                      color: (theme) => theme.palette.primary.dark
                    }}>
                      <Person />
                    </Avatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500, mr: 1 }}>
                            {patient.name}
                          </Typography>
                          <Chip 
                            label={patient.condition} 
                            size="small" 
                            color={getConditionColor(patient.condition)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', mt: 0.5 }}>
                          <Tooltip title="Ward">
                            <Chip 
                              icon={<Home fontSize="small" />}
                              label={patient.ward} 
                              size="small" 
                              variant="outlined"
                              sx={{ mr: 1 }}
                            />
                          </Tooltip>
                          <Tooltip title="Bed">
                            <Chip 
                              icon={<Bed fontSize="small" />}
                              label={patient.bed} 
                              size="small" 
                              variant="outlined"
                            />
                          </Tooltip>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
          
          {selectedHospital?.deceasedList.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center' }}>
                <SentimentVeryDissatisfied color="error" sx={{ mr: 1 }} /> Deceased
              </Typography>
              <List dense>
                {selectedHospital.deceasedList.map((patient, index) => (
                  <ListItem key={index} sx={{ 
                    mb: 1, 
                    backgroundColor: (theme) => theme.palette.error.light,
                    borderRadius: 1,
                    color: (theme) => theme.palette.error.contrastText
                  }}>
                    <Avatar sx={{ 
                      mr: 2, 
                      backgroundColor: (theme) => theme.palette.error.dark,
                    }}>
                      <Person />
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {patient.name}
                        </Typography>
                      }
                      secondary={`Age: ${patient.age || 'Unknown'}`}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
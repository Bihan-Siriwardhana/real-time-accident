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
    <Box sx={{ p: 3, backgroundColor: '#f5f7fa' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600, color: '#2c3e50', display: 'flex', alignItems: 'center' }}>
        <Warning color="warning" sx={{ mr: 1, fontSize: '2rem' }} /> Accident Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {accidents.map((accident) => {
          const uniqueHospitals = [...new Set(accident.people.map(p => p.hospital).filter(Boolean))];
          const totalPeople = accident.people.length;
          const totalDeaths = accident.people.filter(p => p.status === "Deceased").length;
          const totalAdmitted = accident.people.filter(p => p.status === "Admitted").length;
          const admissionPercentage = (totalAdmitted / totalPeople) * 100;
          const deathPercentage = (totalDeaths / totalPeople) * 100;

          return (
            <Grid item xs={12} md={6} lg={4} key={accident.id}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}>
                <Box sx={{ display: "flex", height: '100%' }}>
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                        <LocationOn color="primary" sx={{ mr: 0.5 }} /> {accident.location}
                      </Typography>
                      <StatusChip 
                        label={accident.severity} 
                        color={getSeverityColor(accident.severity)}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                      <DateRange color="action" fontSize="small" sx={{ mr: 0.5 }} />
                      {new Date(accident.date).toLocaleString()}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <People color="primary" sx={{ mr: 1 }} /> 
                        <Box component="span" sx={{ fontWeight: 500 }}>{totalPeople} people involved</Box>
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="primary">
                          <Healing color="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                          Admitted: {totalAdmitted}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {admissionPercentage.toFixed(0)}%
                        </Typography>
                      </Box>
                      <ProgressBar variant="determinate" value={admissionPercentage} color="primary" />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 0.5 }}>
                        <Typography variant="body2" color="error">
                          <SentimentVeryDissatisfied color="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                          Deceased: {totalDeaths}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {deathPercentage.toFixed(0)}%
                        </Typography>
                      </Box>
                      <ProgressBar variant="determinate" value={deathPercentage} color="error" />
                    </Box>
                    
                    {uniqueHospitals.length > 0 && (
                      <Box sx={{ mt: 'auto' }}>
                        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocalHospital color="action" sx={{ mr: 1 }} /> Hospitals Involved:
                        </Typography>
                        <Box>
                          {uniqueHospitals.map((hospital, i) => (
                            <HospitalChip
                              key={i}
                              label={hospital}
                              clickable
                              size="small"
                              onClick={() => handleHospitalClick(hospital)}
                              icon={<LocalHospital fontSize="small" />}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    <ViewButton
                      variant="contained"
                      size="small"
                      color="primary"
                      startIcon={<Visibility />}
                      onClick={() =>
                        navigate(`/accident/${accident.id}`, {
                          state: { accident }
                        })
                      }
                    >
                      View Details
                    </ViewButton>
                  </CardContent>
                  
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: 140, 
                      objectFit: "cover", 
                      borderLeft: '1px solid rgba(0,0,0,0.1)',
                      borderTopRightRadius: 12, 
                      borderBottomRightRadius: 12 
                    }}
                    image={accident.photo}
                    alt={`Accident at ${accident.location}`}
                  />
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

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
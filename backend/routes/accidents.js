const express = require("express");
const router = express.Router();
const Accident = require("../models/Accident");

// POST /api/accidents - Add new accident
router.post("/", async (req, res) => {
  try {
    const accident = new Accident({
      accident_date: req.body.accidentDate,
      location: req.body.location,
      severity_level: req.body.severity,
      description: req.body.description,
      deaths: req.body.deaths,
      patients_in_hospital: req.body.patientsInHospital,
      hospital_name: req.body.hospitalName,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      image_url: req.body.imageUrl
    });

    const savedAccident = await accident.save();
    res.status(201).json(savedAccident);
  } catch (error) {
    console.error("Error saving accident:", error);
    res.status(500).json({ message: "Error saving accident", error });
  }
});

module.exports = router;

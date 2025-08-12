// index.js (or your main server file)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const Accident = require("./models/Accident");

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("Uploads directory created.");
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir)); // serve static files

connectDB();

// GET all accidents
app.get("/accidents", async (req, res) => {
  try {
    const accidents = await Accident.find().sort({ accident_date: -1 });
    res.json(accidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET accident by id
app.get("/accidents/:id", async (req, res) => {
  try {
    const accident = await Accident.findById(req.params.id);
    if (!accident) return res.status(404).json({ message: "Accident not found" });
    res.json(accident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create accident with photo upload
app.post("/create-accident", upload.single("image"), async (req, res) => {
  try {
    const accidentData = req.body;

    if (req.file) {
      accidentData.image_url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    accidentData.deaths = Number(accidentData.deaths);
    accidentData.patients_in_hospital = Number(accidentData.patients_in_hospital);
      accidentData.total_people = Number(accidentData.total_people) || 0;
    accidentData.latitude = Number(accidentData.latitude) || 0;
    accidentData.longitude = Number(accidentData.longitude) || 0;
    accidentData.accident_date = new Date(accidentData.accident_date);

    const accident = new Accident(accidentData);
    await accident.save();

    res.json({ message: "Accident saved successfully", accident });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update accident (general)
app.patch("/accidents/:id", async (req, res) => {
  try {
    const updatedAccident = await Accident.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedAccident) return res.status(404).json({ message: "Accident not found" });
    res.json(updatedAccident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH add a patient to accident
app.patch("/accidents/:id/patients", async (req, res) => {
  try {
    const { name, hospital } = req.body;
    if (!name || !hospital) {
      return res.status(400).json({ message: "Name and hospital are required" });
    }

    const updatedAccident = await Accident.findByIdAndUpdate(
      req.params.id,
      { $push: { patients: { name, hospital } } },
      { new: true }
    );

    if (!updatedAccident) return res.status(404).json({ message: "Accident not found" });
    res.json(updatedAccident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH add a dead body to accident
app.patch("/accidents/:id/deadbodies", async (req, res) => {
  try {
    const { hospital } = req.body;
    if (!hospital) {
      return res.status(400).json({ message: "Hospital is required" });
    }

    const updatedAccident = await Accident.findByIdAndUpdate(
      req.params.id,
      { $push: { deadBodies: { hospital } } },
      { new: true }
    );

    if (!updatedAccident) return res.status(404).json({ message: "Accident not found" });
    res.json(updatedAccident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

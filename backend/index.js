// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Accident = require("./models/Accident");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Hello from backend with MongoDB!");
});

// Example: Create an accident (this triggers auto-create of DB & collection)
app.post("/create-accident", async (req, res) => {
  try {
    const accident = new Accident(req.body);
    await accident.save();
    res.json({ message: "Accident saved successfully", accident });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

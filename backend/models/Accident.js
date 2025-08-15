const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({
  accident_date: { type: Date, required: true },
  location: { type: String, required: true },
  severity_level: { type: String, enum: ["Low", "Medium", "High", "Critical"], required: true },
  description: { type: String },
  deaths: { type: Number, default: 0 },
  patients_in_hospital: { type: Number, default: 0 },
  total_people: { type: Number, default: 0 },
  hospital_name: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  image_url: { type: String },
  patients: [
    {
      name: String,
      hospital: String,
    }
  ],
  deadBodies: [
    {
      hospital: String,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("Accident", accidentSchema);

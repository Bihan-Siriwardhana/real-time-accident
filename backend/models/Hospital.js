const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospital_name: { type: String, required: true },
  location: { type: String, required: true },
  contact_number: { type: String },
  capacity: { type: Number },
  emergency_services: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);

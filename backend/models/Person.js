const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  accident_id: { type: mongoose.Schema.Types.ObjectId, ref: "Accident", required: true },
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  status: { type: String, enum: ["Injured", "Admitted", "Deceased", "Safe"] },
  hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  injury_description: { type: String },
  contact_number: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Person", personSchema);

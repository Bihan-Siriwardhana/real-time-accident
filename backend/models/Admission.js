const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  person_id: { type: mongoose.Schema.Types.ObjectId, ref: "Person", required: true },
  hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  admission_date: { type: Date, required: true },
  discharge_date: { type: Date },
  condition: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Admission", admissionSchema);

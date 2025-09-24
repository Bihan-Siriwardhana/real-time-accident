const express = require("express");
const router = express.Router();
const accidentController = require("../controllers/accidentController");
const { verifyToken, requireHospitalRole } = require("../middleware/auth");

// CRUD Routes
router.post("/", accidentController.createAccident);
router.get("/", accidentController.getAccidents);
router.get("/:id", accidentController.getAccidentById);
router.put("/:id", accidentController.updateAccident);
router.delete("/:id", accidentController.deleteAccident);

// Custom Routes
router.post("/:id/patients", accidentController.addPatient);
router.post("/:id/deadbodies", accidentController.addDeadBody);

// Hospital-specific routes
router.get("/hospital/dashboard", verifyToken, requireHospitalRole, accidentController.getHospitalAccidents);
router.post("/:id/admit-patient", verifyToken, requireHospitalRole, accidentController.addPatientAdmission);
router.put("/:id/update-deaths", verifyToken, requireHospitalRole, accidentController.updateDeathCount);
router.put("/:id/hospital-update", verifyToken, requireHospitalRole, accidentController.updateAccident);

module.exports = router;

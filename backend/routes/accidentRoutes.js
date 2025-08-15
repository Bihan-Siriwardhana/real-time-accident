const express = require("express");
const router = express.Router();
const accidentController = require("../controllers/accidentController");

// CRUD Routes
router.post("/", accidentController.createAccident);
router.get("/", accidentController.getAccidents);
router.get("/:id", accidentController.getAccidentById);
router.put("/:id", accidentController.updateAccident);
router.delete("/:id", accidentController.deleteAccident);

// Custom Routes
router.post("/:id/patients", accidentController.addPatient);
router.post("/:id/deadbodies", accidentController.addDeadBody);

module.exports = router;

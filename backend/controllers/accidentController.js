const Accident = require("../models/Accident");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Create new accident
exports.createAccident = async (req, res) => {
  try {
    const accident = new Accident(req.body);
    const savedAccident = await accident.save();
    return successResponse(res, savedAccident, "Accident created successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Get all accidents
exports.getAccidents = async (req, res) => {
  try {
    const accidents = await Accident.find().sort({ createdAt: -1 });
    return successResponse(res, accidents);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Get accident by ID
exports.getAccidentById = async (req, res) => {
  try {
    const accident = await Accident.findById(req.params.id);
    if (!accident) return errorResponse(res, "Accident not found", 404);
    return successResponse(res, accident);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Update accident
exports.updateAccident = async (req, res) => {
  try {
    const updated = await Accident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return errorResponse(res, "Accident not found", 404);
    return successResponse(res, updated, "Accident updated successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Delete accident
exports.deleteAccident = async (req, res) => {
  try {
    const deleted = await Accident.findByIdAndDelete(req.params.id);
    if (!deleted) return errorResponse(res, "Accident not found", 404);
    return successResponse(res, deleted, "Accident deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Add patient to accident
exports.addPatient = async (req, res) => {
  try {
    const { name, hospital } = req.body;
    const accident = await Accident.findById(req.params.id);
    if (!accident) return errorResponse(res, "Accident not found", 404);

    accident.patients.push({ name, hospital });
    accident.patients_in_hospital = accident.patients.length;
    accident.total_people = accident.deaths + accident.patients_in_hospital;

    await accident.save();
    return successResponse(res, accident, "Patient added successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Add dead body to accident
exports.addDeadBody = async (req, res) => {
  try {
    const { hospital } = req.body;
    const accident = await Accident.findById(req.params.id);
    if (!accident) return errorResponse(res, "Accident not found", 404);

    accident.deadBodies.push({ hospital });
    accident.deaths = accident.deadBodies.length;
    accident.total_people = accident.deaths + accident.patients_in_hospital;

    await accident.save();
    return successResponse(res, accident, "Dead body added successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

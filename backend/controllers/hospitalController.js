const Hospital = require("../models/Hospital");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Create hospital
exports.createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    const saved = await hospital.save();
    return successResponse(res, saved, "Hospital created successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Get all hospitals
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });
    return successResponse(res, hospitals);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Get hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return errorResponse(res, "Hospital not found", 404);
    return successResponse(res, hospital);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Update hospital
exports.updateHospital = async (req, res) => {
  try {
    const updated = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return errorResponse(res, "Hospital not found", 404);
    return successResponse(res, updated, "Hospital updated successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Delete hospital
exports.deleteHospital = async (req, res) => {
  try {
    const deleted = await Hospital.findByIdAndDelete(req.params.id);
    if (!deleted) return errorResponse(res, "Hospital not found", 404);
    return successResponse(res, deleted, "Hospital deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

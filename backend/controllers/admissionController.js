const Admission = require("../models/Admission");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Create new admission
exports.createAdmission = async (req, res) => {
  try {
    const admission = new Admission(req.body);
    const saved = await admission.save();
    return successResponse(res, saved, "Admission created successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Get all admissions
exports.getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate("person_id")
      .populate("hospital_id")
      .sort({ createdAt: -1 });
    return successResponse(res, admissions);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Get admission by ID
exports.getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate("person_id")
      .populate("hospital_id");
    if (!admission) return errorResponse(res, "Admission not found", 404);
    return successResponse(res, admission);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Update admission
exports.updateAdmission = async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return errorResponse(res, "Admission not found", 404);
    return successResponse(res, updated, "Admission updated successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Delete admission
exports.deleteAdmission = async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);
    if (!deleted) return errorResponse(res, "Admission not found", 404);
    return successResponse(res, deleted, "Admission deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

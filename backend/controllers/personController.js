const Person = require("../models/Person");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Create Person
exports.createPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    const saved = await person.save();
    return successResponse(res, saved, "Person created successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Get all persons
exports.getPersons = async (req, res) => {
  try {
    const persons = await Person.find()
      .populate("accident_id")
      .populate("hospital_id");
    return successResponse(res, persons);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Get by ID
exports.getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)
      .populate("accident_id")
      .populate("hospital_id");
    if (!person) return errorResponse(res, "Person not found", 404);
    return successResponse(res, person);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Update Person
exports.updatePerson = async (req, res) => {
  try {
    const updated = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return errorResponse(res, "Person not found", 404);
    return successResponse(res, updated, "Person updated successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Delete Person
exports.deletePerson = async (req, res) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return errorResponse(res, "Person not found", 404);
    return successResponse(res, deleted, "Person deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");

// Verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return errorResponse(res, "Access denied. No token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid token", 401);
  }
};

// Check if user has hospital role
const requireHospitalRole = (req, res, next) => {
  if (req.user.role !== "hospital") {
    return errorResponse(res, "Access denied. Hospital role required", 403);
  }
  next();
};

module.exports = { verifyToken, requireHospitalRole };
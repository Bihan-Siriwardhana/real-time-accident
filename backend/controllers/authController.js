const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Generate JWT
const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Validate password strength
const isValidPassword = (password) => {
  return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword || !role)
      return errorResponse(res, "All fields are required", 400);

    if (!isValidEmail(email))
      return errorResponse(res, "Please provide a valid email address", 400);

    if (!isValidPassword(password))
      return errorResponse(res, "Password must be at least 8 characters with uppercase, lowercase, and number", 400);

    if (password !== confirmPassword)
      return errorResponse(res, "Passwords do not match", 400);

    const userExists = await User.findOne({ email });
    if (userExists) return errorResponse(res, "Email already registered", 400);

    const user = await User.create({ username, email, password, role });

    return successResponse(res, {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    }, "User registered successfully", 201);

  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return errorResponse(res, "Username and password are required", 400);

    const user = await User.findOne({ username });
    if (!user) return errorResponse(res, "Invalid credentials", 401);

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return errorResponse(res, "Invalid credentials", 401);

    return successResponse(res, {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    }, "Login successful");

  } catch (err) {
    return errorResponse(res, err.message);
  }
};

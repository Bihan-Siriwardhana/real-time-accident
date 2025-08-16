const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "secretkey", { expiresIn: "7d" });
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword || !role)
      return errorResponse(res, "All fields are required", 400);

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
      return errorResponse(res, "Email and password are required", 400);

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

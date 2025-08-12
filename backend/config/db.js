// Load environment variables from .env file
require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to Mongo URI:", process.env.MONGO_URI);

    // Connect to MongoDB (no need for deprecated options)
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

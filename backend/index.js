const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Routes
const accidentRoutes = require("./routes/accidentRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const personRoutes = require("./routes/personRoutes");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./utils/errorHandler");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Register API routes
app.use("/api/accidents", accidentRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/persons", personRoutes);
app.use("/api/auth", authRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

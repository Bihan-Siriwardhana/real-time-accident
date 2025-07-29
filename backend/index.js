require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // ⬅️ Use the db.js file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from backend with MongoDB!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

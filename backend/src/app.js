const express = require("express");
const cors = require("cors");

const collegeRoutes = require("./routes/collegeRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

// ✅ middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ routes AFTER middleware
app.use("/api/colleges", collegeRoutes);
app.use("/api/questions", questionRoutes);

module.exports = app;
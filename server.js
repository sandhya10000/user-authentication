const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const projectRoute = require("./routes/projects");
const taskRoute = require("./routes/task");

dotenv.config();
const app = express();
app.use(express.json());
const MONGOURL = process.env.MONGO_URL;

//Routes access here
app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoute);
app.use("/api/task", taskRoute);
// Correct: connect to MongoDB
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected!");

    // Start server after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

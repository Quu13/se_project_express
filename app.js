require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate"); // Celebrate validation error handler
const indexRouter = require("./routes/index"); // Your routes file
const errorHandler = require("./middlewares/error-handler"); // Centralized error handler
const { requestLogger, errorLogger } = require("./middlewares/logger"); // Loggers


const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// Middleware
app.use(express.json());
app.use(cors());

// Log requests
app.use(requestLogger);

// Routes
app.use(indexRouter);

// Log errors after routes
app.use(errorLogger);

// Celebrate validation errors
app.use(errors());

// Custom centralized error handler
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
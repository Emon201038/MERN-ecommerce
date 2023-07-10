const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressRateLimit = require("express-rate-limit");
const cors = require("cors");
const createError = require("http-errors");
const { userRouter } = require("./src/router/userRouter");
const { seedRouter } = require("./src/router/seedRouter");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/", seedRouter);

app.get("/", (req, res) => {
  res.send("Welcome to home route");
});

//client error handler
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

//server and all error handlers
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;

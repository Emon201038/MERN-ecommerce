const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRouter = require("./src/router/userRouter");
const seedRouter = require("./src/router/seedRouter");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/users", userRouter);
app.use("/api/users", seedRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app;

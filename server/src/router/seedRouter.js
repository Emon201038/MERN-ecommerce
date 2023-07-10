const express = require("express");
const seedUsers = require("../controller/seedController");
const seedRouter = express.Router();

seedRouter.get("/", seedUsers);

module.exports = seedRouter;

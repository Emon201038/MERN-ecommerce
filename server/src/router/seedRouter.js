const express = require("express");
const { seedUsers, seedProducts } = require("../controller/seedController");
const seedRouter = express.Router();

seedRouter.get("/users", seedUsers);
seedRouter.get("/products", seedProducts);

module.exports = seedRouter;

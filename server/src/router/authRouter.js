const express = require("express");

const runValidation = require("../validators");
const { handleLogIn, handleLogOut } = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/login", handleLogIn);
authRouter.post("/logout", handleLogOut);

module.exports = authRouter;

const express = require("express");

const runValidation = require("../validators");
const { handleLogIn, handleLogOut } = require("../controller/authController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const authRouter = express.Router();

authRouter.post("/login", isLoggedOut, handleLogIn);
authRouter.post("/logout", isLoggedIn, handleLogOut);

module.exports = authRouter;

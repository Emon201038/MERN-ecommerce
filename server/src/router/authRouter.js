const express = require("express");

const runValidation = require("../validators");
const {
  handleLogIn,
  handleLogOut,
  handleRefreshToken,
  handleProtectedRoute,
} = require("../controller/authController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const { validateUserLogIn } = require("../validators/auth");
const authRouter = express.Router();

authRouter.post(
  "/login",
  isLoggedOut,
  validateUserLogIn,
  runValidation,
  handleLogIn
);
authRouter.post("/logout", isLoggedIn, handleLogOut);
authRouter.get("/refresh-token", handleRefreshToken);
authRouter.get("/protected", handleProtectedRoute);

module.exports = authRouter;

const express = require("express");
const {
  getUsers,
  processRegister,
  getUserById,
  deleteUserById,
  activateUserAccount,
} = require("../controller/userController");
const upload = require("../middlewares/uploadImage");
const validateUserRegistration = require("../validators/auth");
const runValidation = require("../validators");
const userRouter = express.Router();

userRouter.post(
  "/process-register",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/id", deleteUserById);

module.exports = userRouter;

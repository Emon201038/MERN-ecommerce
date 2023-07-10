const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  accountActivation,
} = require("../controller/userController");
const upload = require("../middleware/uploadImage");
const { validateUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post(
  "/process-register",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/activate", accountActivation);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = { userRouter };

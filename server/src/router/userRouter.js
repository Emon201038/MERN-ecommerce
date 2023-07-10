const express = require("express");
const {
  getUsers,
  processRegister,
  getUserById,
  deleteUserById,
  activateUserAccount,
  updateUserById,
} = require("../controller/userController");
const upload = require("../middlewares/uploadImage");
const validateUserRegistration = require("../validators/auth");
const runValidation = require("../validators");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.post(
  "/process-register",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/activate", isLoggedOut, activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", isLoggedIn, deleteUserById);
userRouter.put("/:id", upload.single("image"), isLoggedIn, updateUserById);

module.exports = userRouter;

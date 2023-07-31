const express = require("express");
const {
  handleGetUsers,
  handleProcessRegister,
  handleGetUserById,
  handleDeleteUserById,
  handleActivateUserAccount,
  handleUpdateUserById,
  handleBanUserById,
  handleUnbannUserById,
  handleUpdatePassword,
  handleForgetPassword,
  handleResetPassword,
} = require("../controller/userController");
const upload = require("../middlewares/uploadImage");
const {
  validateUserRegistration,
  validateUserUpdatePassword,
  validateUserForgetPassword,
  validateUserResetPassword,
} = require("../validators/auth");
const runValidation = require("../validators");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.post(
  "/process-register",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  handleProcessRegister
);
userRouter.post("/activate",
  isLoggedOut,
  handleActivateUserAccount
);

userRouter.get("/", isLoggedIn, isAdmin, handleGetUsers);

userRouter.get("/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  handleGetUserById
);

userRouter.delete("/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  handleDeleteUserById
);

userRouter.put(
  "/update-user/:id([0-9a-fA-F]{24})",
  upload.single("image"),
  isLoggedIn,
  handleUpdateUserById
);
userRouter.put("/ban-user/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleBanUserById
);

userRouter.put("/unban-user/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleUnbannUserById
);

userRouter.put(
  "/update-password/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  validateUserUpdatePassword,
  runValidation,
  handleUpdatePassword
);

userRouter.post(
  "/forget-password/",
  validateUserForgetPassword,
  runValidation,
  handleForgetPassword
);

userRouter.put(
  "/reset-password",
  validateUserResetPassword,
  runValidation,
  handleResetPassword
);

module.exports = userRouter;

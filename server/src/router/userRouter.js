const express = require("express");
const {
  getUsers,
  processRegister,
  getUserById,
  deleteUserById,
  activateUserAccount,
} = require("../controller/userController");
const upload = require("../middlewares/uploadImage");
const userRouter = express.Router();

userRouter.post("/process-register", upload.single("image"), processRegister);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/id", deleteUserById);

module.exports = userRouter;

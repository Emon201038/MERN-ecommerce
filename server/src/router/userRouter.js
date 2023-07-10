const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  accountActivation,
} = require("../controller/userController");
const upload = require("../middleware/uploadImage");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/process-register", upload.single("image"), processRegister);
userRouter.post("/activate", accountActivation);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = { userRouter };

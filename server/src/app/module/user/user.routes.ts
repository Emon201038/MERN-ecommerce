import { uploader } from "./../../middlewares/uploader";
import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
const userRouter = express.Router();

// Define user-related routes here
userRouter
  .route("/")
  .post(
    uploader.single("avatar"),
    validateRequest(createUserZodSchema),
    UserController.createUser
  )
  .get(UserController.getAllUser);

export default userRouter;

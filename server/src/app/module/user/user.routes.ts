import { uploader } from "./../../middlewares/uploader";
import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const userRouter = express.Router();

// Define user-related routes here
userRouter
  .route("/")
  .post(
    uploader.single("avatar"),
    validateRequest(createUserZodSchema),
    UserController.createUser
  )
  .get(
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SELLER, UserRole.BUYER),
    UserController.getAllUser
  );

userRouter.route("/:id").get(auth(), UserController.getSingleUser);

export default userRouter;

import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginSchema } from "./auth.validation";
const authRouter = express.Router();

authRouter.post(
  "/login",
  validateRequest(loginSchema),
  AuthController.credentialLogin
);

export default authRouter;

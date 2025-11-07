import { NextFunction, Request, Response } from "express";
import AppError from "../helpers/appError";
import { verifyToken } from "../helpers/jwt";
import { envVars } from "../config/env";
import { UserRole } from "@prisma/client";

export const auth =
  (...roles: UserRole[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken || req.headers.authorization;
      if (!accessToken) {
        throw new AppError(401, "You are not logged in");
      }

      const verifyUser = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_TOKEN_SECRET
      );

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new AppError(403, "You are not allowed to access this route");
      }
      req.user = verifyUser;

      next();
    } catch (error) {
      next(error);
    }
  };

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../utils/httpStatusCode";
import AppError from "../helpers/appError";
import { envVars } from "../config/env";

interface IErrorSources {
  path: string;
  message: string;
}

export const globalError = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: IErrorSources[] = [];

  if (err.name === "ZodError") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Zod validation error";
    errorSources = err.issues.map((error: any) => {
      return {
        path: error.path[error.path.length - 1],
        message: error.message,
      };
    });
  }
  // AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Generic Error
  else if (err instanceof Error) {
    message = err.message;
    statusCode = 500;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources: envVars.NODE_ENV === "development" ? errorSources : null,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};

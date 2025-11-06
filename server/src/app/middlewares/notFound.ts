import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, _next: NextFunction) => {
  res
    .status(404)
    .json({ success: false, statusCode: 404, message: "Route not found" });
};

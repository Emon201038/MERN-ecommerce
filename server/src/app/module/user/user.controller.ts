import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";

const getAllUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await UserService.getAllUser();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User fetched successfully",
      data: result,
    });
  }
);

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User created successfully",
    data: result,
  });
});

export const UserController = { getAllUser, createUser };

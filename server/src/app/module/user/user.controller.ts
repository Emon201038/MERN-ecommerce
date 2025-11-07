import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import { pick } from "../../helpers/pick";
import { userFilterableFields } from "./user.constant";

const getAllUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filters = pick(req.query, userFilterableFields);
    const result = await UserService.getAllUser(filters, options);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User fetched successfully",
      meta: result.meta,
      data: result.data,
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

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User fetched successfully",
    data: result,
  });
});

export const UserController = { getAllUser, createUser, getSingleUser };

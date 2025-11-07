import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../shared/sendResponse";
import { pick } from "../../helpers/pick";

const getCategories = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filters = pick(req.query, ["searchTerm"]);
    const result = await CategoryService.getCategories(filters, options);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Categories fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const createCategory = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.file) throw new Error("Category Image is required");
    const result = await CategoryService.createCategory(req.body, req.file);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Category created successfully",
      data: result,
    });
  }
);

const getSingleCategory = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await CategoryService.getSingleCategory(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Category fetched successfully",
      data: result,
    });
  }
);

export const CategoryController = {
  getCategories,
  createCategory,
  getSingleCategory,
};

import express from "express";
import { CategoryController } from "./category.controller";
import { uploader } from "../../middlewares/uploader";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryCreateSchema } from "./category.validation";
const categoryRoute = express.Router();

categoryRoute
  .route("/")
  .get(CategoryController.getCategories)
  .post(
    auth(...Object.values(UserRole)),
    uploader.single("avatar"),
    validateRequest(categoryCreateSchema),
    CategoryController.createCategory
  );

categoryRoute.route("/:id").get(CategoryController.getSingleCategory);

export default categoryRoute;

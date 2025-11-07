import { Prisma } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import slugify from "slugify";
import AppError from "../../helpers/appError";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";
import {
  calculatePagination,
  IOptions,
} from "../../helpers/calculatePagination";
import { categorySearchAbleFields } from "./category.constant";

const createCategory = async (
  payload: Prisma.CategoryCreateInput,
  image: Express.Multer.File
) => {
  const slug = slugify(payload.title, { lower: true, trim: true });

  payload.slug = slug;

  const existingCategory = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (existingCategory) {
    throw new AppError(409, "Category with this title already exists");
  }

  if (image) {
    const res = await uploadToCloudinary(image.buffer, "ecomart/category");
    payload.avatar = res.secure_url;
  }

  const category = await prisma.category.create({ data: payload });
  return category;
};

const getCategories = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const { searchTerm, ...filterData } = filters;
  const andCondition: Prisma.CategoryWhereInput[] = [];
  if (searchTerm) {
    andCondition.push({
      OR: categorySearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (filterData && Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const categoryAndCondition = {
    AND: andCondition,
  };

  const categories = await prisma.category.findMany({
    where: categoryAndCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.category.count({
    where: categoryAndCondition,
  });

  return {
    meta: {
      page,
      limit,
      total: total,
    },
    data: categories,
  };
};

const getSingleCategory = async (id: string) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return category;
};

export const CategoryService = {
  createCategory,
  getCategories,
  getSingleCategory,
};

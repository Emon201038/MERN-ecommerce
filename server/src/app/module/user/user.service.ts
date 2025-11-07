import {
  calculatePagination,
  IOptions,
} from "./../../helpers/calculatePagination";
import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { ICreateUserInput } from "./user.interface";
import { Request } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";
import { IOptionsResult } from "../../helpers/calculatePagination";
import { Prisma } from "@prisma/client";
import { userSearchAbleFields } from "./user.constant";

const getAllUser = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andCondition: Prisma.UserWhereInput[] = [];
  if (searchTerm) {
    andCondition.push({
      OR: userSearchAbleFields.map((field) => ({
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
  const userWhereCondition = {
    AND: andCondition,
  };
  const users = await prisma.user.findMany({
    where: userWhereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: userWhereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: users,
  };
};

const createUser = async (req: Request) => {
  const data: ICreateUserInput = req.body;

  if (req.file) {
    const res = await uploadToCloudinary(req.file.buffer, "ecommerce/user");
    req.body.avatar = res.secure_url;
  }

  const user = await prisma.user.create({
    data: {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    },
  });

  return user;
};

export const UserService = { getAllUser, createUser };

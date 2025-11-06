import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { ICreateUserInput } from "./user.interface";
import { Request } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";

const getAllUser = async () => {
  const users = await prisma.user.findMany();

  return users;
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

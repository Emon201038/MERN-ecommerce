import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../../shared/prisma";
import AppError from "../../helpers/appError";
import { generateToken } from "../../helpers/jwt";
import { envVars } from "../../config/env";

const credentialLogin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(400, "Invalid password");
  }

  if (user.isDeleted) {
    throw new AppError(400, "your account is deleted. Please regester again");
  }

  const userWithoutPassword = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  const accessToken = generateToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES_IN
  );

  const refreshToken = generateToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    envVars.JWT_REFRESH_TOKEN_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES_IN
  );

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

export const AuthService = { credentialLogin };

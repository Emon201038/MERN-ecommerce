import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";

const credentialLogin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
};

import { UserRole } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
  namespace Jwt {
    interface JwtPayload {
      id: string;
      role: UserRole;
      email: string;
      iat: number;
      exp: number;
    }
  }
}

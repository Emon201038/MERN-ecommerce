import { SignApiOptions } from "cloudinary";
import jwt from "jsonwebtoken";

export const generateToken = (
  payload: object,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  } as SignApiOptions);
};

export const verifyToken = (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret) as Jwt.JwtPayload;
  return decoded;
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

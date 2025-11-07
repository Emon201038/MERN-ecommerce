import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await AuthService.credentialLogin(
      req.body.email,
      req.body.password
    );

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Login successful",
      data: result,
      success: true,
    });
  }
);

export const AuthController = { credentialLogin };

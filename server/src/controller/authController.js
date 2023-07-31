const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { successResponse } = require("./responseController");
const createJSONWebToken = require("../helper/jsonWebToken");
const User = require("../model/userModel");
const { jwtAccessKey, jwtRefreshKey } = require("../../secret");

//controller
const handleLogIn = async (req, res, next) => {
  try {
    //collect data from request body
    const { email, password } = req.body;

    //finding use with existing email
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        404,
        "User not found with this email. Please register first."
      );
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(403, "Invalid password.Try with your actual password");
    }

    //compare banned
    if (user.isBanned === true) {
      throw createError(404, "You have been banned. Contact authority");
    }

    //create jwt
    const accessToken = createJSONWebToken({ user }, jwtAccessKey, "15m");

    //cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, //15 minutes
      httpOnly: true,
      sameSite: "none",
    });
    //refresh token
    const refreshToken = createJSONWebToken({ user }, jwtRefreshKey, "7d");

    //refresh cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      httpOnly: true,
      sameSite: "none",
    });

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    //successResponse
    return successResponse(res, {
      statusCode: 200,
      message: "User was logged in successfully",
      payload: { userWithoutPassword },
    });
  } catch (error) {
    return next(error);
  }
};

//controller
const handleLogOut = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    //successResponse
    return successResponse(res, {
      statusCode: 200,
      message: "User was logout in successfully",
      payload: {},
    });
  } catch (error) {
    return next(error);
  }
};

//controller
const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    //verify Old Refresh Token
    const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);
    

    if (!decodedToken) {
      throw createError(401, "Invalid refresh token. Please log in again.");
    }
    console.log(decodedToken.user);
    
    //create jwt
    const accessToken = createJSONWebToken(decodedToken.user, jwtAccessKey, "15m");

    //cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, //15 minutes
      httpOnly: true,
      sameSite: "none",
    });

    //successResponse
    return successResponse(res, {
      statusCode: 200,
      message: "New access token has been created",
      payload: accessToken,
    });
  } catch (error) {
    return next(error);
  }
};

const handleProtectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    //verify Old Refresh Token
    const decodedToken = jwt.verify(accessToken, jwtAccessKey);
    if (!decodedToken) {
      throw createError(401, "Invalid access token. Please log in again.");
    }

    //successResponse
    return successResponse(res, {
      statusCode: 200,
      message: "Protected resources access successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  handleLogIn,
  handleLogOut,
  handleRefreshToken,
  handleProtectedRoute,
};

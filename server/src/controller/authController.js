const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { successResponse } = require("./responseController");
const createJSONWebToken = require("../helper/jsonWebToken");
const User = require("../model/userModel");
const { jwtAccessKey } = require("../../secret");

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

    //compare the password
    // if (password !== user.password) {
    //   throw createError(401, "Invalid password.Try with your actual password");
    // }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(403, "Invalid password.Try with your actual password");
    }

    //compare banned
    if (user.isBanned === true) {
      throw createError(404, "You have been banned. Contact authority");
    }

    //create jwt
    const accessToken = createJSONWebToken(
      { _id: user._id },
      jwtAccessKey,
      "10m"
    );

    //cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, //15 minutes
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    //successResponse
    return successResponse(res, {
      statusCode: 200,
      message: "User was logged in successfully",
      payload: { user },
    });
  } catch (error) {
    return next(error);
  }
};

//controller
const handleLogOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");

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
module.exports = { handleLogIn, handleLogOut };

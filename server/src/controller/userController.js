const createError = require("http-errors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");
const { succeessResponse } = require("./responseController");
const { findWithId } = require("../services/findWithId");
const { deleteImage } = require("../helper/deleteUserImage");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { jwtActivationKey, clientUrl } = require("../../secret");
const emailWithNodemailer = require("../helper/email");

const getUsers = async (req, res, next) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const searchRegExp = new RegExp(".*" + search + ".*", "i");

  //filtering search value
  const filter = {
    isAdmin: { $ne: true },
    $or: [
      {
        name: { $regex: searchRegExp },
        email: { $regex: searchRegExp },
        phone: { $regex: searchRegExp },
      },
    ],
  };

  //searching users with filter
  const users = await User.find(filter)
    .limit(limit)
    .skip((page - 1) * limit);

  if (!users) throw createError(404, "User not found");

  //counting total documents in the database
  const count = await User.find(filter).countDocuments();

  //success Response
  return succeessResponse(res, {
    statusCode: 200,
    message: "Successfully get all users",
    payload: {
      users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    },
  });
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    //finding user using id from the database
    const user = await findWithId(User, id);

    //success Response
    return succeessResponse(res, {
      statusCode: 200,
      message: "Successfully get the user",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    //find item using id
    const id = req.params.id;
    const item = await findWithId(User, id);

    //image delete
    const userImagePath = item.image;
    await deleteImage(userImagePath);

    //deleting user
    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    //success Response
    return succeessResponse(res, {
      statusCode: 200,
      message: "Successfully delete the user",
      payload: { item },
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    //destructuring data
    const { name, email, password, phone, address } = req.body;

    //user existing check using email
    const userExist = await User.exists({ email: email });
    if (userExist) {
      throw createError(
        409,
        "User with this email is already exists. Please sign in."
      );
    }

    //create jwt
    const token = createJSONWebToken(
      { name, email, password, phone, address },
      jwtActivationKey,
      "10m"
    );

    //prepare Email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
      <h2>Hello ${name} !</h2>
      <p>Please click this link to <a href="${clientUrl}/api/user/activate/${token}"> activate your account</a></p>`,
    };

    //sending email with nodemailer
    try {
      await emailWithNodemailer(emailData);
    } catch (error) {
      next(createError(500, "Failed to send verification mali"));
    }
    //success Response
    return succeessResponse(res, {
      statusCode: 200,
      message: `Please go to your email ${email} for completeing registration process.`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

const accountActivation = async (req, res, next) => {
  try {
    //receiving token from request body
    const token = req.body.token;
    if (!token) throw createError(404, "Token not found");

    try {
      //decodeding jwt token
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) throw createError(401, "User is unable to verify");

      //user existing check
      const userExist = await User.exists({ email: decoded.email });
      if (userExist) {
        throw createError(
          409,
          "User with this email is already exists. Please sign in."
        );
      }

      //creating user
      const user = await User.create(decoded);

      //success Response
      return succeessResponse(res, {
        statusCode: 200,
        message: `User was registered successfully.`,
        payload: { user },
      });
    } catch (error) {
      //jwt error handle
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid JSON Web Token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  accountActivation,
};

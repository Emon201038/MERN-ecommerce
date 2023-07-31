const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { successResponse } = require("./responseController");
const createJSONWebToken = require("../helper/jsonWebToken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const {
  jsonSecretKey,
  clientUrl,
  jwtResetPasswordKey,
} = require("../../secret");
const deleteImage = require("../helper/deleteImage");
const sendEmailWithNodeMail = require("../helper/email");
const findWithId = require("../services/findwithId");

const handleGetUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

    //search regular expression
    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    //filtering search results
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    //Not returning passwords
    const options = { password: 0 };

    //searching user and set limit
    const users = await User.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    //counting total documents in database
    const count = await User.find(filter, options).countDocuments();
    
    if (!users || users.length === 0) throw createError(404, "User not found")


    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "USers found successfully",
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
  } catch (error) {
    next(error);
  }
};

const handleGetUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    //finding user with respective id
    const user = await findWithId(User, id, options);

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "User found successfully",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const item = await findWithId(User, id, options);
    const userImagePath = item.image;

    //deleting user image
    await deleteImage(userImagePath);

    //deleting user
    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      payload: { item },
    });
  } catch (error) {
    next(error);
  }
};

const handleProcessRegister = async (req, res, next) => {
  try {
    //destructuring user input
    const { name, email, password, phone, address } = req.body;

    const image = req.file;
    if (!image) {
      throw createError(400, "Image file is required. Please upload an image");
    }
    if (image.size >= 1024 * 1024 * 2) {
      throw createError(
        400,
        "Image file is too big. Please upload an image within 2MB"
      );
    }
    const imageBufferString = image.buffer.toString("base64");

    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(
        409,
        "Usre already exists with this email address. Please log in"
      );
    }

    //create jwt
    const token = createJSONWebToken(
      {
        name,
        email,
        password,
        phone,
        address,
        image: imageBufferString,
      },
      jsonSecretKey,
      "10m"
    );

    //prepare email
    const mailData = {
      email,
      subject: "Account activation mail",
      html: `<h2>Hello ${name} !</h2>
      <p>Please click on the link to<a href="${clientUrl}/activate/${token}" target="_blank"> activate your account</a></p>
      `,
    };
    //sending email
    try {
      await sendEmailWithNodeMail(mailData);
    } catch (Emailerror) {
      next(createError(500, "Failed to send email"));
      return;
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} to activate your account`,
      payload: {  },
    });
  } catch (error) {
    next(error);
  }
};

const handleActivateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      throw createError(404, "Cannot verify user");
    }
    try {
      //verify token
      const decoded = jwt.verify(token, jsonSecretKey);
      if (!decoded) {
        throw createError(404, "User is unable to verify");
      }

      //user existing check
      const userExists = await User.exists({ email: decoded.email });
      if (userExists) {
        throw createError(
          409,
          "Usre already exists with this email address. Please log in"
        );
      }

      //create user
      const newItem = await User.create(decoded);
      console.log(newItem);

      //success response
      return successResponse(res, {
        statusCode: 201,
        message: `user registered successfull`,
        payload: newItem,
      });
    } catch (error) {
      //checking Possible error
      if (error.name === "TokenExpiredError") {
        throw createError(404, "Token is expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(404, "Token is invalid");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};
const handleUpdateUserById = async (req, res, next) => {
  try {
    const options = { password: 0 };
    const userId = req.params.id;
    await findWithId(User, userId, options);

    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};

    //name email password phon image address
    // if (req.body.name) updates.name = req.body.name;
    // if (req.body.password) updates.password = req.body.password;
    // if (req.body.phone) updates.phone = req.body.phone;
    // if (req.body.address) updates.address = req.body.address;

    const allowedFields = ["name", "password", "phone", "address"]
    for (const key in req.body) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      } else if (key === 'email') {
        throw createError(404, "email cannot be updated");
      }
    }

    const image = req.file;
    if (image) {
      if (image.size >= 1024 * 1024 * 2) {
        throw createError(
          400,
          "Image file is too big. Please upload an image within 2MB"
        );
      }
      updates.image = image.buffer.toString("base64");
    }

    //updating user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User does not exist with this id");
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "User was updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const handleBanUserById = async (req, res, next) => {
  try {
    const options = { password: 0 };
    const userId = req.params.id;
    await findWithId(User, userId, options);
    const update = { isBanned: true };
    const updateOptions = { new: true, runValidators: true, context: "query" };

    //updating user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      updateOptions
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User wat not banned");
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "User was banned successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const handleUnbannUserById = async (req, res, next) => {
  try {
    const options = { password: 0 };
    const userId = req.params.id;
    const user = await findWithId(User, userId, options);
    const update = { isBanned: false };
    const updateOptions = { new: true, runValidators: true, context: "query" };

    if (!user.isBanned) {
      throw createError(404, "User is not banned");
    }

    //updating user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      updateOptions
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User wat not Unbanned");
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "User was Unbanned successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdatePassword = async (req, res, next) => {
  try {
    const {oldPassword, newPassword} = req.body;
    const userId = req.params.id;
    const user = await findWithId(User, userId);

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw createError(403, "Old password is incorrect.");
    }
;
    const update = { $set: { password: newPassword } };
    const updateOptions = { new: true };

    //updating user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      updateOptions
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User wat not Updated.");
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "User password updated successfully",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

const handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email: email });
    if (!userData) {
      throw createError(
        404,
        "Email is incorrect or you have not verified your email. Please register your account."
      );
    }
    //create jwt
    const token = createJSONWebToken({ email }, jwtResetPasswordKey, "10m");
    //prepare email
    const mailData = {
      email,
      subject: "Reset Password mail",
      html: `<h2>Hello ${userData.name} !</h2>
      <p>Please click on the link to<a href="${clientUrl}/api/user/reset-password/${token}" target="_blank"> reset your password. </a></p>
      `,
    };
    try {
      await sendEmailWithNodeMail(mailData);
    } catch (Emailerror) {
      next(createError(500, "Failed to send to send reset password email"));
      return;
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} to reset your password .`,
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};

const handleResetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, jwtResetPasswordKey);

    if (!decoded) {
      throw createError(400, "Invalid or expired token.");
    }

    const filter = { email: decoded.email };
    const update = { password: newPassword };
    const updateOption = { new: true };

    //updating user
    const updatedUser = await User.findOneAndUpdate(
      filter,
      update,
      updateOption
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "Password reset failed.");
    }
    //success response
    return successResponse(res, {
      statusCode: 200,
      message: `Password reset successfully .`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetUsers,
  handleProcessRegister,
  handleGetUserById,
  handleDeleteUserById,
  handleActivateUserAccount,
  handleUpdateUserById,
  handleBanUserById,
  handleUnbannUserById,
  handleUpdatePassword,
  handleForgetPassword,
  handleResetPassword,
};

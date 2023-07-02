const data = require("../../data");
const User = require("../model/userModel");
const { successResponse } = require("./responseController");

const seedUsers = async (req, res, next) => {
  try {
    //deleteing existing users
    await User.deleteMany({});

    //inserting new users
    const users = await User.insertMany(data.users);

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "User inserted successfully",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = seedUsers;

const data = require("../../data");
const User = require("../model/userModel");
const { succeessResponse } = require("./responseController");

const seedUsers = async (req, res, next) => {
  try {
    //deleting existing users in database
    await User.deleteMany({});

    //inserting new users in database
    const users = await User.insertMany(data.users);

    //success response
    return succeessResponse(res, {
      statusCode: 200,
      message: "Users inserted to database successfully",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = seedUsers;

const data = require("../../data");
const Product = require("../model/productModel");
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

const seedProducts = async (req, res, next) => {
  try {
    //deleteing existing users
    await Product.deleteMany({});

    //inserting new users
    const products = await Product.insertMany(data.products);

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Products inserted successfully",
      payload: { products },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUsers, seedProducts };

const mongoose = require("mongoose");
const createError = require("http-errors");

const findWithId = async (Model, id) => {
  try {
    const item = await Model.findById(id);
    if (!item) {
      throw createError(404, `User does not exist with this id`);
    }

    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(404, "Invalid id");
    }
    throw error;
  }
};
module.exports = { findWithId };

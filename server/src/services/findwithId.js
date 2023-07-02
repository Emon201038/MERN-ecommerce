const mongoose = require("mongoose");
const createError = require("http-errors");

const findWithId = async (Model, id, options = {}) => {
  try {
    const item = await Model.findById(id, options);
    if (!item) {
      throw createError(404, `${Model.name} does not exist with this id`);
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose) {
      throw createError(404, "Invalid id");
    }
    throw error;
  }
};
module.exports = findWithId;

const mongoose = require("mongoose");
const { dbUrl } = require("../../secret");
const logger = require("../controller/loggerController");

const connectDb = async () => {
  try {
    mongoose.connect(dbUrl).then(() => {
      logger.log('info',"Connected to DB is successful");
    });
    mongoose.connection.on("error", (err) => {
      logger.log('error',"DB connection error", err);
    });
  } catch (error) {
    logger.log('error',error);
  }
};

module.exports = connectDb;

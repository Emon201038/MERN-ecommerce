const mongoose = require("mongoose");
const { dbUrl } = require("../../secret");

const connectDb = async () => {
  try {
    mongoose.connect(dbUrl).then(() => {
      console.log("Connected to DB is successful");
    });
    mongoose.connection.on("error", (err) => {
      console.log("DB connection error", err);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDb;

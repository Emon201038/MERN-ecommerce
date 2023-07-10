const mongoose = require("mongoose");
const { dbUrl } = require("../../secret");

const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Mongodb connection successfully established");

    mongoose.connection.on("error", (error) => {
      console.error("DB connection error", error);
    });
  } catch (error) {
    console.error("Couldn't connect to mongodb: ", error.toString());
  }
};

module.exports = dbConnection;

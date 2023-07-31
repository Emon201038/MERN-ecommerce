const User = require("../model/userModel");

const checkUserExist = async (email) => {
  return await User.exists({ email: email });
}

module.exports = checkUserExist;
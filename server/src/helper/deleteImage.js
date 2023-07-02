const fs = require("fs").promises;

const deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log("User image deleted");
  } catch (error) {
    console.error("User image does not exist", error);
  }
};

module.exports = deleteImage;

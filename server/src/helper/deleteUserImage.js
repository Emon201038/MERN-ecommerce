require("fs").promises;

const deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log("User image is deleleted successfully");
  } catch (error) {
    console.error("usre image does not exist", error);
  }
};

module.exports = { deleteImage };

const multer = require("multer");

const { maxFileSize, allowedFileTypes } = require("../../secret");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files are allowed"), false);
  }
  if (file.size > maxFileSize) {
    cb(new Error("File size exceeds the maximum limit"), false);
  }
  if (!allowedFileTypes.includes(file.mimetype)) {
    cb(new Error("File type is not allowed"), false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter,
});
module.exports = upload;

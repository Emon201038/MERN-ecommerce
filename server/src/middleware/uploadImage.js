const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const {
  UPLOAD_USER_IMAGE_DIRECTORY,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} = require("../config");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMAGE_DIRECTORY);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(extname, "") + extname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    return cb(new Error("File type not allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;

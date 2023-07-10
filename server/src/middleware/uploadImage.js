const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const { allowedFileTypes, maxFileSize } = require("../../secret");

const uploadDir = "public/images/users";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
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
  if (!allowedFileTypes.includes(extname.substring(1))) {
    return cb(createError(400, "File type not allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: maxFileSize },
  fileFilter,
});

module.exports = upload;

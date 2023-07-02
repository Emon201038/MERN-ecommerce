const multer = require("multer");
const path = require("path");

const { fileDirectory } = require("../../secret");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileDirectory);
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(extName, "") + extName
    );
  },
});

const upload = multer({ storage: storage });
module.exports = upload;

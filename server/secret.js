require("dotenv").config();

const port = process.env.PORT || 3002;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const defaultImagePath =
  process.env.IMAGE_PATH || "/public/images/users/default.jpeg";
const jsonSecretKey = process.env.JSON_SECRET_KEY || "2387eoiwhjgkljdvfns@#";
const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientUrl = process.env.CLIENT_URL || "";
const maxFileSize = Number(process.env.MAX_FILE_SIZE || 209715);
const allowedFileTypes =
  process.env.ALLOWED_FILE_TYPES || "['image/jpg','image/png','image/jpeg']";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "wetdkjhfglkjdf";
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "SDFGTDFHGDFgdsgsd";
const jwtResetPasswordKey =
  process.env.JWT_RESTE_PASSWORD_KEY || "wpoiefgjjnc;sdldkwoieped";

module.exports = {
  port,
  dbUrl,
  defaultImagePath,
  jsonSecretKey,
  smtpUsername,
  smtpPassword,
  clientUrl,
  maxFileSize,
  allowedFileTypes,
  jwtAccessKey,
  jwtResetPasswordKey,
  jwtRefreshKey,
};

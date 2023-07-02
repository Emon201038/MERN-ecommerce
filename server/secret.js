require("dotenv").config();

const port = process.env.PORT || 3002;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const defaultImagePath =
  process.env.IMAGE_PATH || "/public/images/users/default.jpeg";
const jsonSecretKey = process.env.JSON_SECRET_KEY || "2387eoiwhjgkljdvfns@#";
const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientUrl = process.env.CLIENT_URL || "";
const fileDirectory = process.env.UPLOAD_FILE || "";

module.exports = {
  port,
  dbUrl,
  defaultImagePath,
  jsonSecretKey,
  smtpUsername,
  smtpPassword,
  clientUrl,
  fileDirectory,
};

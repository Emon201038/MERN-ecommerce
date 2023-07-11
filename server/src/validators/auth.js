const { body } = require("express-validator");

//user registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your name")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name should be at least 3-32 digits long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.Enter your password")
    .isLength({ min: 6 })
    .withMessage("Password length must be at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage(
      "Password should contain a lowercase letter, uppercase letter,a numerical character and a special character"
    ),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("address is required. Enter your address")
    .isLength({ min: 3 })
    .withMessage("address length must be at least 6 characters"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required. Enter your phone"),
  body("image")
    .custom((value, { req }) => {
      if (!req.file || !req.file.buffer) {
        throw new Error("Image is required. Please upload an image");
      }
      return true;
    })
    .withMessage("Image is required. Please upload an image"),
];

const validateUserLogIn = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.Enter your password")
    .isLength({ min: 6 })
    .withMessage("Password length must be at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage(
      "Password should contain a lowercase letter, uppercase letter,a numerical character and a special character"
    ),
];

module.exports = { validateUserRegistration, validateUserLogIn };

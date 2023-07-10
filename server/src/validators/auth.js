const { body } = require("express-validator");

const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be between 3 and 31 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("User password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password should contain at least a upper case letter, a lower case letter, a number and a space character"
    ),
  body("phone").trim().notEmpty().withMessage("User phone is required"),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("User address is required")
    .isLength({ min: 3 })
    .withMessage("Address should be at least 6 characters"),
  body("image").optional().isString(),
];

module.exports = { validateUserRegistration };

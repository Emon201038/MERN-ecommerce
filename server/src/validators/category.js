const { body } = require("express-validator");

//user registration validation
const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 3 })
    .withMessage("Category name should be at least 3 digits long"),
];

module.exports = {
  validateCategory,
};

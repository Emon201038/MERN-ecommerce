const { body } = require("express-validator");

//user registration validation
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Product name should be at least 3-150 digits long"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description name is required.")
    .isLength({ min: 3 })
    .withMessage("Description name should be at least 3 digits long"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({ min: 0 })
    .withMessage("Price should be a positive number"),
  body("shipping")
    .trim()
    .notEmpty()
    .withMessage("shipping is required.")
    .isFloat({ min: 0 })
    .withMessage("shipping should be a positive number"),
  body("category").trim().notEmpty().withMessage("Category name is required."),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt({ min: 1 })
    .withMessage("Quantity should be a positive number"),
];

module.exports = {
  validateProduct,
};

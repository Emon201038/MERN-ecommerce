const express = require("express");
const {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
} = require("../controller/productController");
const upload = require("../middlewares/uploadImage");
const { validateProduct } = require("../validators/products");
const runValidation = require("../validators");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

const productRouter = express.Router();

//POST -> /api/products
productRouter.post(
  "/",
  upload.single("image"),
  isLoggedIn,
  isAdmin,
  validateProduct,
  runValidation,
  handleCreateProduct
);

//GET -> /api/products
productRouter.get("/", handleGetProducts);

//GET -> /api/product
productRouter.get("/:slug", handleGetProduct);

//DELETE -> /api/products
productRouter.delete("/:slug", isLoggedIn, isAdmin, handleDeleteProduct);

module.exports = productRouter;

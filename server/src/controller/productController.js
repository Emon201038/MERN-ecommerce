const Product = require("../model/productModel");
const { successResponse } = require("./responseController");
const createError = require("http-errors");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProductBySlug,
} = require("../services/productService");

const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.body;

    const image = req.file;
    if (!image) {
      throw createError(400, "image file is required");
    }

    if (image.size > 2 * 1024 * 1024) {
      throw createError(
        400,
        "Image is too large. Image size must be less than 2 MB"
      );
    }
    const imageBufferString = image.buffer.toString("base64");

    const productDetails = {
      name,
      description,
      price,
      quantity,
      shipping,
      category,
      imageBufferString,
    };

    const product = await createProduct(productDetails);

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Product created successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const productsData = await getProducts(page, limit);
    const { products, count, totalPages, currentPage } = productsData;

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "returned all the products",
      payload: {
        products: products,
        pagination: {
          totalPages: totalPages,
          currentPage: page,
          previousPage: page - 1,
          nextPage: page + 1,
          totalNumberOfProducts: count,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await getProduct(slug);
    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteProduct = async (req, res, next) => {
  try {
    const product = await deleteProductBySlug(slug);
    //success response
    return successResponse(res, {
      statusCode: 200,
      message: `${product.name} Product has been deleted successfully`,
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
};

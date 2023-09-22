const Product = require("../model/productModel");
const { successResponse } = require("./responseController");
const createError = require("http-errors");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProductBySlug,
  updateProduct,
} = require("../services/productService");
const { default: slugify } = require("slugify");

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
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    //search regular expression
    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    //filtering search results
    const filter = {
      $or: [{ name: { $regex: searchRegExp } }],
    };

    const productsData = await getProducts(page, limit, filter);
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
    const slug = req.params.slug;
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
    const slug = req.params.slug;
    const product = await deleteProductBySlug(slug);
    //success response
    return successResponse(res, {
      statusCode: 200,
      message: `${product.name} Product has been deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const image = req.file;

    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};

    //name email password phon image address
    // if (req.body.name) updates.name = req.body.name;
    // if (req.body.password) updates.password = req.body.password;
    // if (req.body.phone) updates.phone = req.body.phone;
    // if (req.body.address) updates.address = req.body.address;

    const allowedFields = [
      "name",
      "description",
      "price",
      "quantity",
      "sold",
      "shipping",
      "category",
    ];
    for (const key in req.body) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    }
    const updatedProduct = await updateProduct(
      slug,
      updates,
      image,
      updateOptions
    );
    if (!updatedProduct) {
      throw createError(404, "Product does not exist with this name");
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Product was updated successfully",
      payload: updatedProduct,
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
  handleUpdateProductBySlug,
};

const slugify = require("slugify");

const Product = require("../model/productModel");

const createProduct = async (productDetails) => {
  const {
    name,
    description,
    price,
    quantity,
    shipping,
    category,
    imageBufferString,
  } = productDetails;
  const productExists = await Product.exists({ name: name });

  if (productExists) {
    throw createError(
      409,
      "There is already a product with this name. Please enter another name."
    );
  }

  //create a new product
  const product = await Product.create({
    name: name,
    slug: slugify(name),
    price: price,
    description: description,
    quantity: quantity,
    shipping: shipping,
    image: imageBufferString,
    category: category,
  });
  return product;
};

const getProducts = async (page = 1, limit = 4) => {
  const products = await Product.find({})
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (!products) {
    throw createError(404, "No products found");
  }
  const count = await Product.find({}).countDocuments();
  return {
    products,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

const getProduct = async (slug) => {
  const product = await Product.findOne({ slug }).populate("category");

  if (!product) {
    throw createError(404, "No product found");
  }
  return product;
};

const deleteProductBySlug = async (slug) => {
  const product = await Product.findOneAndDelete({ slug });
  if (!product) {
    throw createError(404, "No product found");
  }
  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProductBySlug,
};

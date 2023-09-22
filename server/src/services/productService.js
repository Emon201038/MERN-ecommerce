const slugify = require("slugify");
const createError = require("http-errors");

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

const getProducts = async (page = 1, limit = 4, filter = {}) => {
  const products = await Product.find(filter)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (!products) {
    throw createError(404, "No products found");
  }
  const count = await Product.find(filter).countDocuments();
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

const updateProduct = async (slug, updates, image, updateOptions) => {
  if (updates.name) {
    updates.slug = slugify(updates.name);
  }

  if (image) {
    if (image.size >= 1024 * 1024 * 2) {
      throw createError(
        400,
        "Image file is too big. Please upload an image within 2MB"
      );
    }
    updates.image = image.buffer.toString("base64");
  }

  //updating product
  const updatedProduct = await Product.findOneAndUpdate(
    { slug },
    updates,
    updateOptions
  );

  return updatedProduct;
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProductBySlug,
  updateProduct,
};

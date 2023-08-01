const slugify = require("slugify");
const createError = require("http-errors");

const Category = require("../model/categoryModel");

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name: name,
    slug: slugify(name),
  });
  return newCategory;
};

const getCategories = async () => {
  return await Category.find({}).select("name slug").lean();
};

const getCategory = async (slug) => {
  const category = await Category.find({ slug }).select("name slug").lean();

  if (!category) {
    throw createError(404, "Category not found");
  }
  return category;
};

const updateCategory = async (name, slug) => {
  const filter = { slug };
  const updates = {
    $set: { name: name, slug: slugify(name) },
  };
  const options = {
    new: true,
  };

  const updateCategory = await Category.findOneAndUpdate(
    filter,
    updates,
    options
  );
  return updateCategory;
};

const deleteCategory = async (slug) => {
  const deletedCategory = await Category.findOneAndDelete({ slug });
  return deletedCategory;
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

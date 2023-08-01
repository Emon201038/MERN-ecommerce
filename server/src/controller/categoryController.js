const createError = require("http-errors");

const { successResponse } = require("./responseController");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const handleCreateCategory = async (req, res, next) => {
  try {
    //destructuring user input
    const { name } = req.body;

    const newCategory = await createCategory(name);

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Category created successfully",
      payload: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();
    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Categories fetched successfully",
      payload: categories,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await getCategory(slug);

    if (!category) {
      throw createError(404, "No category found.");
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Categories fetched successfully",
      payload: category,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateCategory = async (req, res, next) => {
  try {
    //destructuring user input
    const { name } = req.body;
    const { slug } = req.params;

    const updatedCategory = await updateCategory(name, slug);

    if (!updatedCategory) {
      throw createError(404, "No category was found with this slug.");
    }

    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Category updated successfully",
      payload: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await deleteCategory(slug);

    if (!result) {
      throw createError(404, "No category was found to delete.");
    }
    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};

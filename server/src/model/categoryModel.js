const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minLength: [2, "User name must be at least 2 characters"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug name is required"],
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);
const Category = model("category", categorySchema);

module.exports = Category;

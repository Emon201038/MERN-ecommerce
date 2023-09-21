const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minLength: [2, "Product name must be at least 2 characters"],
      maxLength: [150, "Product name must be maximum 150 characters"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minLength: [3, "Product description must be at least 3 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      validate: {
        validator: (v) => v > 0,
        message: (props) =>
          `${props} is not a valid price. Price must be greater than 0.`,
      },
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      trim: true,
      validate: {
        validator: (v) => v > 0,
        message: (props) =>
          `${props} is not a valid quantity. Quantity must be greater than 0.`,
      },
    },
    sold: {
      type: Number,
      required: [true, "Product sold is required"],
      trim: true,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    image: {
      type: Buffer,
      contentType: String,
      required: [true, "Product image is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
  },
  { timestamps: true }
);
const Product = model("product", productSchema);

module.exports = Product;

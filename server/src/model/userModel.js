const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultImagePath } = require("../../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: [2, "User name must be at least 2 characters"],
      maxLength: [32, "User name must be at most 32 characters"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [16, "Password must be at most 16 characters"],
      Set: (v) => {
        return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
      },
    },
    phone: {
      type: String,
      required: [true, "User phone is required"],
    },
    address: {
      type: String,
      required: [true, "User address is required"],
    },
    image: {
      type: String,
      default: defaultImagePath,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = model("users", userSchema);

module.exports = User;

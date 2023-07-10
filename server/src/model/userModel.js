const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: [2, "User name must be at least 2 characters"],
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
      required: [true, "User password is required"],
      trim: true,
      minLength: [6, "User password must be at least 6 characters"],
      minLength: [16, "User password must be at least 16 characters"],
      set: (v) => {
        return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
      },
    },
    phone: {
      type: String,
      required: [true, "User phone is required"],
      trim: true,
      minLength: [11, "User name must be at least 11 characters"],
    },
    address: {
      type: String,
      required: [true, "User address is required"],
      trim: true,
      minLength: [2, "User name must be at least 2 characters"],
    },
    image: {
      type: String,
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

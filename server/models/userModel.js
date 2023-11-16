import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    newPassword: {
      type: String,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    otpCode: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model("users", userSchema);

export default userModel;

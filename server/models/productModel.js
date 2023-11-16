import mongoose from "mongoose";

const schema = mongoose.Schema;

const productSchema = new schema(
  {
    productTitle: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productBrand: {
      type: String,
      required: true,
    },
    productInventory: {
      type: Number,
      required: true,
      min: 0,
    },
    productRating: {
      type: Number,
      default: 0, // Example default value
    },
  },
  {
    timestamps: true,
  }
);

const productModel = new mongoose.model("products", productSchema);

export default productModel;

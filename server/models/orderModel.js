import mongoose from "mongoose";

const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ], // Array of order items
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = new mongoose.model("orders", orderSchema);

export default orderModel;

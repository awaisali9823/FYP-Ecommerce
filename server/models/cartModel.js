import mongoose from "mongoose";

const schema = mongoose.Schema;

const cartSchema = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [
      {
        productTitle: {
          type: String,
          required: true,
        },
        productPrice: {
          type: String,
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          min: 1,
        },
      },
    ],
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = new mongoose.model("cart", cartSchema);

export default cartModel;

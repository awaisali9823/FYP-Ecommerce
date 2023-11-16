import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// New Cart
export const creatCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items });
    } else {
      for (const newItem of items) {
        const existingItem = cart.items.find((item) => {
          if (item.productId) {
            return item.productId.toString() === newItem.productId.toString();
          }
          return false;
        });

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push(newItem);
        }
      }
    }

    await cart.save();

    res.status(200).send({
      message: "Cart Created",
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
};
// get carts

export const getAllCarts = async (req, res) => {
  try {
    const { userId } = req.params;
    const carts = await Cart.find({ userId })
      .populate({
        path: "userId",
        model: "users",
        select: "-v",
      })
      .populate({
        path: "items.productId",
        model: "products",
      });

    res.status(200).send({
      message: "Carts retrieved successfully",
      success: true,
      data: carts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// get single cart

export const getSingleCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById({ id });

    if (!cart) {
      return res.status(401).send({
        message: "Cart not Found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Carts retrieved successfully",
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// update multiple carts
export const updateCarts = async (req, res) => {
  try {
    const { carts } = req.body;

    for (const cartItem of carts) {
      const { cartId, items } = cartItem;

      const cart = await Cart.findOne({ _id: cartId });

      if (cart) {
        for (const newItem of items) {
          const chexkExistingItem = cart.items.find((item) => {
            return item.productId.toString() === newItem.productId;
          });
          if (chexkExistingItem) {
            chexkExistingItem.quantity += newItem.quantity;
          } else {
            cart.items.push(newItem);
          }
        }
        await cart.save();
      }
    }
    res.status(200).send({
      message: "Carts updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
};

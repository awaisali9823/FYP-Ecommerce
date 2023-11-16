import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart || !cart.items.length) {
      return res.status(400).send({
        message: "Cart is empty",
        success: false,
      });
    }

    const order = new Order({
      userId,
      items: cart.items, // Copy cart items to order
      status: "Pending",
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(200).send({
      message: "Order Created",
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
};

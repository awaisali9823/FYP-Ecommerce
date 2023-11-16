import Product from "../models/productModel.js";

// New Product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    await newProduct.save();
    res.status(200).send({
      message: "Product Created Succesfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Get All Products
export const getAllProduct = async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).send({
      message: "Product Data fetch Succesfully",
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Get Single Product
export const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await Product.findById(productId);
    if (!response) {
      return res.status(404).send({
        message: "Product  not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Product Data fetch Succesfully",
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Update Products
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Product.findByIdAndUpdate(id, req.body);

    res.status(200).send({
      message: "Product Data Updated Successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Delete the Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Product.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Product Deleted Successfully",
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

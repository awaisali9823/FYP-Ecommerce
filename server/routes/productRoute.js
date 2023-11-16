import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-all-product", getAllProduct);
router.get("/get-single-product/:id", getSingleProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;

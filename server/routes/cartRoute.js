import express from "express";
import {
  creatCart,
  getAllCarts,
  getSingleCart,
  updateCarts,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-cart", authMiddleware, creatCart);
router.get("/get-carts/:userId", getAllCarts);
router.get("/get-single-cart/:id", getSingleCart);
router.put("/update-carts", updateCarts);

export default router;

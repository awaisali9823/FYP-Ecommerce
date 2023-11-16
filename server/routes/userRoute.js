import express from "express";
import {
  creatUser,
  deleteUser,
  forgetPassword,
  getAllUser,
  getSingleUser,
  getUserInfoById,
  updateUser,
  userLogin,
  verifyOtp,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-user", creatUser);
router.post("/user-login", userLogin);
router.get("/get-all-user", getAllUser);
router.get("/get-single-user/:id", getSingleUser);
router.post("/get-user-info-by-id", authMiddleware, getUserInfoById);
router.put("/update-user", authMiddleware, updateUser);
router.delete("/delete-user/:id", authMiddleware, deleteUser);
router.post("/forget-password", forgetPassword);
router.post("/verify-otp", verifyOtp);

export default router;

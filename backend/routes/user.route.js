import express from "express";
import {
  loginUser,
  registerUser,
  savedPost,
  sendOTP,
  verifyOTP,
  changePassword,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/savedpost", savedPost);
router.post("/reset/sendotp", sendOTP);
router.post("/reset/verifyOTP", verifyOTP);
router.patch("/reset/changepassword", changePassword);

export default router;

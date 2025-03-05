import express from "express";
import {
  loginUser,
  registerUser,
  savedPost,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/savedpost", savedPost);

export default router;

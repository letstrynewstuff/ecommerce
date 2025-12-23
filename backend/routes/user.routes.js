

import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getUserById,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", auth, getCurrentUser);
router.get("/:id", auth, getUserById);

export default router;



// routes/admin.routes.js
import express from "express";
import User from "../models/User.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", adminLogin);

// GET ALL USERS (ADMIN ONLY)
router.get("/users", adminAuth, async (req, res) => {
  try {
    console.log("Admin verified:", req.admin);

    const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// DELETE USER (ADMIN ONLY)
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;

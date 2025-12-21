
// // routes/admin.routes.js
// import express from "express";
// const router = express.Router();

// import { adminLogin } from "../controllers/admin.controller.js";
// import { auth } from "../middleware/auth.middleware.js"; 
// import { adminAuth } from "../middleware/adminAuth.js";// assuming both middlewares exist

// /**
//  * ADMIN LOGIN
//  */
// router.post("/login", adminLogin); // This is the key route

// /**
//  * GET ALL USERS (Admin only)
//  */
// // router.get("/users", auth, adminAuth, async (req, res) => {
// //   try {
// //     const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
// //     res.json(users);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ msg: "Server Error" });
// //   }
// // });
// router.get("/users", auth, adminAuth, async (req, res) => {
//   try {
//     console.log("Admin user:", req.user);
//     const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
//     console.log("Users fetched:", users);
//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// /**
//  * DELETE USER (Admin only)
//  */
// router.delete("/users/:id", auth, adminAuth, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     await User.findByIdAndDelete(req.params.id);
//     res.json({ msg: "User deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// export default router;

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

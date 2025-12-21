// // user.routes.js
// import { Router } from "express";
// import {
//   getCurrentUser,
//   registerUser,
//   loginUser,
//   getUserById,
// } from "../controllers/user.controller.js";
// import { auth  } from "../middleware/auth.middleware.js"; // or wherever your JWT middleware is
// import { adminAuth } from "../middleware/adminAuth.js";

// const router = Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // GET current user from JWT
// router.get("/me", auth, getCurrentUser);

// // GET any user by ID (still works)
// router.get("/:id", auth, getUserById);

// export default router;


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


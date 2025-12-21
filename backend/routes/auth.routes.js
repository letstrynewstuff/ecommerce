// import express from "express";
// import User from "../models/User.js";

// const router = express.Router();

// /**
//  * SIGN UP
//  */
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password)
//       return res.status(400).json({ message: "All fields required" });

//     const existing = await User.findOne({ username });
//     if (existing)
//       return res.status(409).json({ message: "Username already exists" });

//     const user = await User.create({
//       username,
//       password,
//     });

//     res.status(201).json({
//       message: "Account created",
//       user: {
//         _id: user._id,
//         username: user.username,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Registration failed" });
//   }
// });

// /**
//  * LOGIN
//  */
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user || user.password !== password)
//       return res.status(401).json({ message: "Invalid credentials" });

//     res.json({
//       message: "Login successful",
//       user: {
//         _id: user._id,
//         username: user.username,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed" });
//   }
// });

// export default router;


import express from "express";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

const router = express.Router();

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username,
    password, // ⚠️ plain text
    role: "user",
  });

  res.status(201).json({ message: "Account created" });
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({
    id: user._id,
    role: user.role,
  });

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  });
});

export default router;

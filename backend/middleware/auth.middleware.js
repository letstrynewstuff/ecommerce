

import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key"; // ✅ added

// Generate JWT
export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

// Verify JWT (used in auth middleware)
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};


// export const auth = (req, res, next) => {
//   const header = req.headers.authorization;

//   if (!header || !header.startsWith("Bearer ")) {
//     return res.status(401).json({ msg: "No token" });
//   }

//   try {
//     const token = header.split(" ")[1];
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // { id, role }
//     next();
//   } catch {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };


// export const adminAuth = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ msg: "Admin only" });
//   }
//   next();
// };
// auth.middleware.js
export const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token" });
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ make sure it's `user`
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only" });
  }
  next();
};

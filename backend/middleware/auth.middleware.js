// // backend/middleware/auth.middleware.js (Updated for adminAuth)
// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// const auth = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token)
//     return res.status(401).json({ msg: "No token, authorization denied" });

//   try {
//     const decoded = verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// const adminAuth = async (req, res, next) => {
//   try {
//     const admin = await Admin.findById(req.user);
//     if (!admin) return res.status(403).json({ msg: "Admin access required" });
//     next();
//   } catch (err) {
//     res.status(403).json({ msg: "Admin access required" });
//   }
// };

// export default { auth, adminAuth };



// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// const { verify } = jwt;


// // Generate JWT
// export const signToken = (payload) => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
// };

// // Verify JWT (used in auth middleware)
// export const verifyToken = (token) => {
//   return jwt.verify(token, JWT_SECRET);
// };


// // User auth (JWT exists)
// export const auth = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     const decoded = verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// // Admin auth (JWT + admin exists)
// export const adminAuth = async (req, res, next) => {
//   try {
//     const admin = await Admin.findById(req.user);
//     if (!admin) {
//       return res.status(403).json({ msg: "Admin access required" });
//     }
//     next();
//   } catch (err) {
//     return res.status(403).json({ msg: "Admin access required" });
//   }
// };
// User auth (JWT exists)
// export const auth = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded; // store full decoded payload { id, role }
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Token is not valid" });
//   }
// };
// Protect normal user routes
// Admin auth (JWT + admin exists)
// export const adminAuth = async (req, res, next) => {
//   try {
//     if (!req.user || req.user.role !== "admin") {
//       return res.status(403).json({ msg: "Admin access required" });
//     }

//     // Optional: verify admin exists in DB
//     const admin = await Admin.findById(req.user.id);
//     if (!admin) return res.status(403).json({ msg: "Admin access required" });

//     next();
//   } catch (err) {
//     return res.status(403).json({ msg: "Admin access required" });
//   }
// };

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

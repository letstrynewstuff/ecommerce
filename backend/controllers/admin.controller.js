// // controllers/admin.controller.js
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find admin by email and role
//     const admin = await User.findOne({ email, role: "admin" });

//     if (!admin) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Direct password comparison
//     if (password !== admin.password) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Generate token
//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" },
//     );

//     res.json({
//       msg: "Admin login successful",
//       token,
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//       },
//     });
//   } catch (err) {
//     console.error("Admin login error:", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };


// // controllers/admin.controller.js
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find admin user
//     const admin = await User.findOne({ email, role: "admin" });

//     if (!admin) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Compare password (bcrypt)
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Generate token
//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       msg: "Admin login successful",
//       token,
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role,
//       },
//     });
//   } catch (err) {
//     console.error("Admin login error:", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };


// import Admin from "../models/Admin.js"; // Use the Admin model
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find admin by email
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Compare password with bcrypt
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Generate token
//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" },
//     );

//     // Return admin info
//     res.json({
//       msg: "Admin login successful",
//       token,
//       admin: {
//         id: admin._id,
//         email: admin.email,
//         role: "admin",
//       },
//     });
//   } catch (err) {
//     console.error("Admin login error:", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };


import jwt from "jsonwebtoken";

/**
 * Admin Login using hardcoded credentials from .env
 */
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check against env vars
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: "admin_id", role: "admin", email: adminEmail },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" },
    );

    res.json({
      msg: "Admin login successful",
      token,
      admin: {
        id: "admin_id", // you can hardcode a fake ID for admin
        name: "Admin",
        email: adminEmail,
        role: "admin",
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

// // controllers/admin.controller.js
// import User from "../models/User.js"; // Use User model
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await User.findOne({ email, role: "admin" });

//     if (!admin) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Generate JWT (optional but recommended)
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
//     console.error(err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };


// // controllers/admin.controller.js
// import User from "../models/User.js"; // Use User model
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await User.findOne({ email, role: "admin" });

//     if (!admin) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

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
//     console.error(err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };


// controllers/admin.controller.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find admin by email and role
//     const admin = await User.findOne({ email, role: "admin" });

//     if (!admin) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     // Compare password
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


export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email and role
    const admin = await User.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Direct password comparison
    if (password !== admin.password) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

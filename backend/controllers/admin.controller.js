

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

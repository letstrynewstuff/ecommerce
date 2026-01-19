// import User from "../models/User.js";
// import { signToken } from "../middleware/auth.middleware.js";

// /**
//  * REGISTER
//  */
// export async function registerUser(req, res) {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ msg: "All fields are required" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: "user",
//     });

//     const token = signToken({ id: user._id, role: user.role });

//     res.status(201).json({
//       msg: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// }

// /**
//  * LOGIN
//  */
// export async function loginUser(req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ msg: "Email and password required" });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const token = signToken({ id: user._id, role: user.role });

//     res.json({
//       msg: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// }

// /**
//  * GET CURRENT USER (/me)
//  */
// export async function getCurrentUser(req, res) {
//   try {
//     const user = await User.findById(req.user.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// }

// /**
//  * GET USER BY ID
//  */
// export async function getUserById(req, res) {
//   try {
//     const user = await User.findById(req.params.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// }


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { signToken } from "../middleware/auth.middleware.js";

/**
 * ======================
 * REGISTER USER
 * ======================
 */
export async function registerUser(req, res) {
  const { name, email, password, address, gender } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Name, email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address: address || "",
      gender: gender || "",
      role: "user",
    });

    // Generate token
    const token = signToken({ id: user._id, role: user.role });

    // Response
    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        gender: user.gender,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

/**
 * ======================
 * LOGIN USER
 * ======================
 */
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = signToken({ id: user._id, role: user.role });

    res.json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        gender: user.gender,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

/**
 * ======================
 * GET CURRENT USER (/me)
 * ======================
 */
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("GET ME ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

/**
 * ======================
 * GET USER BY ID
 * ======================
 */
export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("GET USER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

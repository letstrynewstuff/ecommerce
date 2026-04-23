// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import http from "http";
// import { Server } from "socket.io";
// import { fileURLToPath } from "url";

// // Routes
// import adminRoutes from "./routes/admin.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import orderRoutes from "./routes/order.routes.js";
// import locationRoutes from "./routes/location.routes.js";
// // import authRoutes from "./routes/auth.routes.js";

// // Utils
// import { createAdminIfNotExists } from "./utils/createAdmin.js";

// // Models
// import ChatMessage from "./models/ChatMessage.js";
// import User from "./models/User.js";

// dotenv.config();

// const app = express();

// // =======================
// // GLOBAL MIDDLEWARE
// // =======================
// app.use(cors());
// app.use(express.json());

// // =======================
// // STATIC FILES
// // =======================
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // =======================
// // HEALTH CHECK
// // =======================
// app.get("/", (req, res) => {
//   res.send("✅ SecureComm API is running...");
// });

// // =======================
// // ROUTES
// // =======================
// app.use("/api/admin", adminRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/locations", locationRoutes);
// // app.use("/api/auth", authRoutes);

// // =======================
// // DATABASE CONNECTION
// // =======================
// const connectDB = async () => {
//   try {
//     console.log("🔌 Connecting to MongoDB...");
//     console.log("🗄️ Mongo URI:", process.env.MONGO_URI);

//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB Connected");

//     // Clean legacy index (safe)
//     mongoose.connection.once("open", async () => {
//       try {
//         const indexes = await mongoose.connection.db
//           .collection("users")
//           .indexes();

//         if (indexes.some((i) => i.name === "username_1")) {
//           await mongoose.connection.db
//             .collection("users")
//             .dropIndex("username_1");
//           console.log("🧹 Removed legacy username index");
//         }
//       } catch (err) {
//         console.error("Index cleanup error:", err.message);
//       }
//     });

//     await createAdminIfNotExists();
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1);
//   }
// };

// connectDB();

// // =======================
// // SOCKET.IO
// // =======================
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// const onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   /* ================= USER JOIN ================= */
//   socket.on("join_chat", async ({ userId }) => {
//     if (!userId) return;

//     onlineUsers.set(userId, socket.id);
//     socket.join(userId); // private room

//     const messages = await ChatMessage.find({ userId }).sort({
//       createdAt: 1,
//     });

//     socket.emit("chat_history", messages);
//   });

//   /* ================= ADMIN JOIN ================= */
//   socket.on("join_admin", () => {
//     socket.join("admins");
//     console.log("🛡️ Admin joined admin room");
//   });

// /* ================= USER MESSAGE ================= */
// socket.on("user_message", async ({ userId, userEmail, message }) => {
//   if (!userId || !message) return;

//   // Fetch user from DB
//   const user = await User.findById(userId);

//   const savedMessage = await ChatMessage.create({
//     userId,
//     userEmail: userEmail || user?.email || "unknown@example.com",
//     sender: "user",
//     message,
//   });

//   // Send to admins with user info
//   io.to("admins").emit("admin_receive_message", {
//     userId: savedMessage.userId.toString(),
//     name: user?.name || "User",
//     ...savedMessage._doc,
//   });

//   // Send back to user's room (confirmation)
//   io.to(userId).emit("new_message", savedMessage);
// });

// socket.on("admin_message", async ({ userId, message }) => {
//   if (!userId || !message) return;

//   const user = await User.findById(userId);
//   if (!user) {
//     console.error("Admin tried to message non-existent user:", userId);
//     return;
//   }

//   try {
//     const savedMessage = await ChatMessage.create({
//       userId,
//       userEmail: user.email,
//       sender: "admin",
//       message,
//     });

//     // Emit to the user if connected
//     io.to(userId).emit("new_message", savedMessage);

//     // Emit to all admins
//     io.to("admins").emit("admin_receive_message", {
//       userId: savedMessage.userId.toString(),
//       name: user.name || "User",
//       ...savedMessage._doc,
//     });
//   } catch (err) {
//     console.error("Failed to save admin message:", err.message);
//   }
// });

//   socket.on("get_chat_history", async ({ userId }) => {
//     if (!userId) return;

//     const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });

//     socket.emit("chat_history", messages);
//   });

//   /* ================= DISCONNECT ================= */
//   socket.on("disconnect", () => {
//     console.log("🔴 Socket disconnected:", socket.id);

//     for (const [userId, socketId] of onlineUsers.entries()) {
//       if (socketId === socket.id) {
//         onlineUsers.delete(userId);
//         break;
//       }
//     }
//   });
// });

// // =======================
// // SERVER START
// // =======================
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

// Routes
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import locationRoutes from "./routes/location.routes.js";

// Utils
import { createAdminIfNotExists } from "./utils/createAdmin.js";

// Models
import ChatMessage from "./models/ChatMessage.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

// =======================
// GLOBAL MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// STATIC FILES
// =======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.send("✅ SecureComm API is running...");
});

// =======================
// ROUTES
// =======================
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/locations", locationRoutes);

// =======================
// DATABASE CONNECTION
// =======================
const connectDB = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    mongoose.connection.once("open", async () => {
      try {
        const indexes = await mongoose.connection.db
          .collection("users")
          .indexes();
        if (indexes.some((i) => i.name === "username_1")) {
          await mongoose.connection.db
            .collection("users")
            .dropIndex("username_1");
          console.log("🧹 Removed legacy username index");
        }
      } catch (err) {
        console.error("Index cleanup error:", err.message);
      }
    });

    await createAdminIfNotExists();
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

connectDB();

// =======================
// SOCKET.IO
// =======================
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  /* ================= USER JOIN ================= */
  socket.on("join_chat", async ({ userId }) => {
    if (!userId) return;
    onlineUsers.set(userId, socket.id);
    socket.join(userId);
    const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });
    socket.emit("chat_history", messages);
  });

  /* ================= ADMIN JOIN ================= */
  socket.on("join_admin", async () => {
    socket.join("admins");
    console.log("🛡️ Admin joined admin room");

    // ✅ FIX: Send all past conversations to admin on connect so sidebar survives reload
    try {
      // Get distinct userIds who have ever sent a message
      const recentMessages = await ChatMessage.aggregate([
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$userId",
            lastMessage: { $first: "$message" },
            lastSender: { $first: "$sender" },
            lastAt: { $first: "$createdAt" },
          },
        },
        { $sort: { lastAt: -1 } },
        { $limit: 50 },
      ]);

      // Hydrate with user names
      const conversations = await Promise.all(
        recentMessages.map(async (item) => {
          const user = await User.findById(item._id).select("name email");
          return {
            userId: item._id.toString(),
            name:
              user?.name ||
              user?.email ||
              `User …${item._id.toString().slice(-4)}`,
            lastMessage: item.lastMessage,
            lastAt: item.lastAt,
          };
        }),
      );

      socket.emit("recent_conversations", conversations);
    } catch (err) {
      console.error("Failed to load recent conversations:", err.message);
    }
  });

  /* ================= USER MESSAGE ================= */
  socket.on("user_message", async ({ userId, userEmail, message }) => {
    if (!userId || !message) return;

    const user = await User.findById(userId);

    const savedMessage = await ChatMessage.create({
      userId,
      userEmail: userEmail || user?.email || "unknown@example.com",
      sender: "user",
      message,
    });

    // Send to admins with user info
    io.to("admins").emit("admin_receive_message", {
      userId: savedMessage.userId.toString(),
      name: user?.name || "User",
      ...savedMessage._doc,
    });

    // Confirm back to user (for new_message listener — do NOT echo back the optimistic)
    io.to(userId).emit("message_confirmed", {
      tempId: null, // user side handles by timestamp
      ...savedMessage._doc,
    });
  });

  /* ================= ADMIN MESSAGE ================= */
  socket.on("admin_message", async ({ userId, message }) => {
    if (!userId || !message) return;

    const user = await User.findById(userId);
    if (!user) {
      console.error("Admin tried to message non-existent user:", userId);
      return;
    }

    try {
      const savedMessage = await ChatMessage.create({
        userId,
        userEmail: user.email,
        sender: "admin",
        message,
      });

      // Send to user
      io.to(userId).emit("new_message", savedMessage);

      // ✅ FIX: Send back ONLY to the sending admin socket, NOT to the whole admins room
      // This replaces the optimistic temp bubble with the confirmed one
      socket.emit("admin_message_confirmed", {
        userId: savedMessage.userId.toString(),
        ...savedMessage._doc,
      });
    } catch (err) {
      console.error("Failed to save admin message:", err.message);
    }
  });

  /* ================= GET CHAT HISTORY ================= */
  socket.on("get_chat_history", async ({ userId }) => {
    if (!userId) return;
    const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });
    socket.emit("chat_history", messages);
  });

  /* ================= DISCONNECT ================= */
  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
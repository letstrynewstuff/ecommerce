

// // index.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import http from "http";
// import { Server } from "socket.io";
// import { fileURLToPath } from "url";

// // Route imports
// import adminRoutes from "./routes/admin.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import orderRoutes from "./routes/order.routes.js";
// import locationRoutes from "./routes/location.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import { createAdminIfNotExists } from "./utils/createAdmin.js";

// // Models
// import ChatMessage from "./models/ChatMessage.js";

// dotenv.config();

// const app = express();

// // =======================
// // Middleware
// // =======================
// app.use(cors());
// app.use(express.json());

// // Static folder for product images
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // =======================
// // Health Check
// // =======================
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // =======================
// // Routes
// // =======================
// app.use("/api/admin", adminRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/locations", locationRoutes);
// app.use("/api/auth", authRoutes);

// // =======================
// // MongoDB Connection + Admin Creation
// // =======================
// const connectDB = async () => {
//   mongoose.connection.once("open", async () => {
//     try {
//       const indexes = await mongoose.connection.db.collection("users").indexes();
//       const hasUsernameIndex = indexes.some((i) => i.name === "username_1");

//       if (hasUsernameIndex) {
//         await mongoose.connection.db.collection("users").dropIndex("username_1");
//         console.log("✅ Removed legacy username index");
//       }
//     } catch (err) {
//       console.error("Index cleanup error:", err.message);
//     }
//   });

//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected");

//     // Create admin if it doesn't exist
//     await createAdminIfNotExists();
//   } catch (err) {
//     console.error("MongoDB Connection Error:", err);
//     process.exit(1); // exit process if connection fails
//   }
// };

// connectDB();

// // =======================
// // SOCKET.IO SETUP
// // =======================
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*", // restrict to frontend URL in production
//     methods: ["GET", "POST"],
//   },
// });

// // Track online users
// const onlineUsers = {}; // userId -> socketId

// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   /* USER JOINS CHAT */
//   socket.on("join_chat", async ({ userId }) => {
//     if (!userId) return;

//     onlineUsers[userId] = socket.id;

//     const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });
//     socket.emit("chat_history", messages);
//   });

//   /* USER SENDS MESSAGE */
//   socket.on("user_message", async ({ userId, message }) => {
//     if (!userId || !message) return;

//     const newMessage = await ChatMessage.create({
//       userId,
//       sender: "user",
//       message,
//     });

//     // Send to admin dashboard
//     io.emit("admin_receive_message", newMessage);
//   });

//   /* ADMIN SENDS MESSAGE */
//   socket.on("admin_message", async ({ userId, message }) => {
//     if (!userId || !message) return;

//     const newMessage = await ChatMessage.create({
//       userId,
//       sender: "admin",
//       message,
//     });

//     const userSocketId = onlineUsers[userId];
//     if (userSocketId) {
//       io.to(userSocketId).emit("new_message", newMessage);
//     }
//   });

//   /* DISCONNECT */
//   socket.on("disconnect", () => {
//     console.log("🔴 Socket disconnected:", socket.id);

//     Object.keys(onlineUsers).forEach((key) => {
//       if (onlineUsers[key] === socket.id) delete onlineUsers[key];
//     });
//   });
// });

// // =======================
// // SERVER START
// // =======================
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
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
import authRoutes from "./routes/auth.routes.js";

// Utils
import { createAdminIfNotExists } from "./utils/createAdmin.js";

// Models
import ChatMessage from "./models/ChatMessage.js";

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
app.use("/api/auth", authRoutes);

// =======================
// DATABASE CONNECTION
// =======================
const connectDB = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    console.log("🗄️ Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Clean legacy index (safe)
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
// SOCKET.IO SETUP
// =======================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("join_chat", async ({ userId }) => {
    if (!userId) return;

    onlineUsers[userId] = socket.id;

    const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });
    socket.emit("chat_history", messages);
  });

  socket.on("user_message", async ({ userId, message }) => {
    if (!userId || !message) return;

    const newMessage = await ChatMessage.create({
      userId,
      sender: "user",
      message,
    });

    io.emit("admin_receive_message", newMessage);
  });

  socket.on("admin_message", async ({ userId, message }) => {
    if (!userId || !message) return;

    const newMessage = await ChatMessage.create({
      userId,
      sender: "admin",
      message,
    });

    const userSocketId = onlineUsers[userId];
    if (userSocketId) {
      io.to(userSocketId).emit("new_message", newMessage);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
    Object.keys(onlineUsers).forEach((id) => {
      if (onlineUsers[id] === socket.id) delete onlineUsers[id];
    });
  });
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

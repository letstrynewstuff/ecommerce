

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, PackageSearch } from "lucide-react";
import { io } from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchCurrentUser } from "../services/api.js";

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
// Dynamic socket URL based on env
const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD.replace("/api", "")
    : import.meta.env.VITE_API_URL_DEV.replace("/api", "");

export default function Account() {
  const navigate = useNavigate();

  const [trackingNumber, setTrackingNumber] = useState("");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchCurrentUser(token).then((data) => setUser(data));
  }, []);

  // Connect to Socket.IO and load chat history
  useEffect(() => {
    if (!user?._id) return;

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.emit("join_chat", { userId: user._id });

    socket.on("chat_history", (history) => {
      setMessages(
        history.map((msg) => ({
          id: msg._id,
          sender: msg.sender,
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isRead: true,
        }))
      );
    });

    socket.on("new_message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg._id,
          sender: msg.sender,
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isRead: false,
        },
      ]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?._id]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current || !user?._id) return;

    const messageText = newMessage.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: messageText,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isRead: false,
      },
    ]);

    socketRef.current.emit("user_message", {
      userId: user._id,
      message: messageText,
    });

    setNewMessage("");
  };

  // ✅ Redirect to Tracking page
  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) return;
    navigate(`/tracking/${trackingNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white pt-32 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          My Account
        </h1>

        {/* PROFILE + TRACKING */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* PROFILE */}
          <div className="bg-purple-900/30 rounded-3xl p-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-6">Profile</h2>
            <p className="text-gray-300">Name: {user?.name || "John Doe"}</p>
            <p className="text-gray-300">
              Email: {user?.email || "user@securecomm.global"}
            </p>
          </div>

          {/* TRACK ORDER */}
          <div className="bg-purple-900/30 rounded-3xl p-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <PackageSearch className="w-6 h-6" />
              Track Order
            </h2>

            <input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
            />

            <button
              onClick={handleTrackOrder}
              disabled={!trackingNumber.trim()}
              className={`mt-4 w-full py-3 rounded-xl font-bold transition
                ${
                  trackingNumber.trim()
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02]"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
            >
              Track Package
            </button>
          </div>
        </div>

        {/* SUPPORT CHAT PREVIEW */}
        <div className="bg-purple-900/30 rounded-3xl p-8 border border-purple-500/30 text-center">
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-3">
            <MessageCircle className="w-8 h-8" />
            Secure Support Chat
          </h2>

          <div className="max-w-2xl mx-auto mt-4 bg-slate-950/20 rounded-2xl p-6 text-left">
            <div className="h-64 overflow-y-auto space-y-3 mb-4 scrollbar-thin scrollbar-thumb-purple-600">
              {messages.length === 0 ? (
                <p className="text-center text-gray-400 pt-20">
                  No messages yet. Start a secure conversation below.
                </p>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      m.sender === "user"
                        ? "ml-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "mr-auto bg-slate-700/70 text-gray-100"
                    }`}
                  >
                    <p className="text-sm">{m.text}</p>
                    <p className="text-xs opacity-70 text-right mt-1">
                      {m.time}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && sendMessage()
                }
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
              />
              <button
                onClick={sendMessage}
                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:scale-105 transition flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Link
            to="/chat"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Open Full Secure Chat
          </Link>
        </div>
      </div>
    </div>
  );
}

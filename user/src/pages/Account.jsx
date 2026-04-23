import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Send,
  PackageSearch,
  User,
  Mail,
  ChevronRight,
  Package,
} from "lucide-react";
import { io } from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchCurrentUser } from "../services/api.js";

// ✅ FIX: Strip /api from socket URL (was connecting to wrong endpoint)
const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD.replace("/api", "")
    : (import.meta.env.VITE_API_URL_DEV || "http://localhost:5000").replace(
        "/api",
        "",
      );

export default function Account() {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchCurrentUser(token).then((data) => setUser(data));
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    // ✅ FIX: Don't force websocket transport — let socket.io negotiate
    const socket = io(SOCKET_URL);
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
        })),
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
        },
      ]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current || !user?._id) return;
    const messageText = newMessage.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        sender: "user",
        text: messageText,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    // ✅ FIX: Include userEmail so server can save message without crashing
    socketRef.current.emit("user_message", {
      userId: user._id,
      userEmail: user.email,
      message: messageText,
    });

    setNewMessage("");
  };

  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) return;
    navigate(`/tracking/${trackingNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        body { margin: 0; }

        .acct-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0a0a0f;
          color: #f0f0f0;
          padding-top: 5rem;
        }

        .acct-hero {
          text-align: center;
          padding: 2.5rem 1rem 1rem;
        }

        .acct-hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 0.25rem;
          background: linear-gradient(135deg, #e0e0ff 0%, #a78bfa 50%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .acct-hero p {
          color: #6b7280;
          font-size: 0.95rem;
          margin: 0;
        }

        .acct-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          max-width: 960px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        @media (min-width: 640px) {
          .acct-grid { grid-template-columns: 1fr 1fr; }
        }

        .card {
          background: #111118;
          border: 1px solid #1e1e2e;
          border-radius: 20px;
          padding: 1.75rem;
          transition: border-color 0.2s;
        }

        .card:hover { border-color: #3b3b5c; }

        .card-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b7280;
          margin: 0 0 1.25rem;
        }

        .profile-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .profile-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #1a1a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .profile-icon svg { color: #a78bfa; }

        .profile-label {
          font-size: 0.72rem;
          color: #4b5563;
          margin: 0 0 0.15rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .profile-value {
          font-size: 0.95rem;
          font-weight: 500;
          color: #e5e7eb;
          margin: 0;
        }

        .track-input {
          width: 100%;
          background: #0d0d16;
          border: 1px solid #1e1e2e;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .track-input:focus { border-color: #7c3aed; }
        .track-input::placeholder { color: #374151; }

        .track-btn {
          margin-top: 0.85rem;
          width: 100%;
          padding: 0.8rem;
          border-radius: 12px;
          border: none;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: opacity 0.2s, transform 0.15s;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: white;
        }

        .track-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .track-btn:not(:disabled):hover { transform: translateY(-1px); opacity: 0.9; }

        /* Chat section */
        .chat-section {
          max-width: 960px;
          margin: 0 auto 3rem;
          padding: 0 1rem;
        }

        .chat-card {
          background: #111118;
          border: 1px solid #1e1e2e;
          border-radius: 20px;
          overflow: hidden;
        }

        .chat-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #1a1a28;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
        }

        .chat-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          margin: 0;
        }

        .chat-status {
          font-size: 0.75rem;
          color: #34d399;
          margin: 0;
        }

        .open-chat-btn {
          font-size: 0.75rem;
          color: #a78bfa;
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.2s;
        }

        .open-chat-btn:hover { color: #c4b5fd; }

        .chat-messages {
          height: 260px;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          scrollbar-width: thin;
          scrollbar-color: #1e1e2e transparent;
        }

        .chat-empty {
          margin: auto;
          text-align: center;
          color: #374151;
          font-size: 0.9rem;
        }

        .bubble {
          max-width: 72%;
          padding: 0.65rem 1rem;
          border-radius: 16px;
          font-size: 0.9rem;
          line-height: 1.5;
          word-break: break-word;
        }

        .bubble-user {
          align-self: flex-end;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .bubble-admin {
          align-self: flex-start;
          background: #1a1a2e;
          color: #d1d5db;
          border-bottom-left-radius: 4px;
        }

        .bubble-time {
          font-size: 0.68rem;
          opacity: 0.6;
          text-align: right;
          margin-top: 0.25rem;
        }

        .chat-input-row {
          padding: 1rem 1.25rem;
          border-top: 1px solid #1a1a28;
          display: flex;
          gap: 0.65rem;
          align-items: center;
        }

        .chat-input {
          flex: 1;
          background: #0d0d16;
          border: 1px solid #1e1e2e;
          border-radius: 12px;
          padding: 0.7rem 1rem;
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .chat-input:focus { border-color: #7c3aed; }
        .chat-input::placeholder { color: #374151; }

        .send-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.15s;
        }

        .send-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .send-btn:not(:disabled):hover { transform: scale(1.08); opacity: 0.9; }
      `}</style>

      <Navbar />

      <div className="acct-root">
        <div className="acct-hero">
          <h1>My Account</h1>
          <p>Manage your profile, track orders, and chat with support</p>
        </div>

        {/* Profile + Track grid */}
        <div className="acct-grid">
          {/* Profile */}
          <div className="card">
            <p className="card-label">Profile</p>
            <div className="profile-row">
              <div className="profile-icon">
                <User size={16} />
              </div>
              <div>
                <p className="profile-label">Name</p>
                <p className="profile-value">{user?.name || "—"}</p>
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-icon">
                <Mail size={16} />
              </div>
              <div>
                <p className="profile-label">Email</p>
                <p className="profile-value">{user?.email || "—"}</p>
              </div>
            </div>
          </div>

          {/* Track Order */}
          <div className="card">
            <p className="card-label">Track Order</p>
            <input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrackOrder()}
              className="track-input"
            />
            <button
              onClick={handleTrackOrder}
              disabled={!trackingNumber.trim()}
              className="track-btn"
            >
              <Package size={15} />
              Track Package
            </button>
          </div>
        </div>

        {/* Support Chat */}
        <div className="chat-section">
          <div className="chat-card">
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-avatar">SC</div>
                <div>
                  <p className="chat-title">Support Chat</p>
                  <p className="chat-status">● Online</p>
                </div>
              </div>
              <Link to="/chat" className="open-chat-btn">
                Full chat <ChevronRight size={14} />
              </Link>
            </div>

            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-empty">
                  <MessageCircle
                    size={28}
                    style={{ opacity: 0.2, marginBottom: 8 }}
                  />
                  <p>No messages yet</p>
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`bubble ${m.sender === "user" ? "bubble-user" : "bubble-admin"}`}
                  >
                    <p style={{ margin: 0 }}>{m.text}</p>
                    <p className="bubble-time">{m.time}</p>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-row">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && sendMessage()
                }
                className="chat-input"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="send-btn"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, ArrowLeft, ShieldCheck } from "lucide-react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import { fetchCurrentUser } from "../services/api.js";

const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD.replace("/api", "")
    : (import.meta.env.VITE_API_URL_DEV || "http://localhost:5000").replace(
        "/api",
        "",
      );

export default function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [connected, setConnected] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchCurrentUser(token)
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!user?._id || socketRef.current) return;

    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.emit("join_chat", { userId: user._id });

    socket.on("chat_history", (history = []) => {
      setMessages(
        history.map((msg) => ({
          id: msg._id,
          sender: msg.sender,
          text: msg.message,
          confirmed: true,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })),
      );
    });

    // Admin reply comes in here
    socket.on("new_message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg._id,
          sender: msg.sender,
          text: msg.message,
          confirmed: true,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    // ✅ Server confirms user's own message was saved — replace temp bubble
    socket.on("message_confirmed", (msg) => {
      setMessages((prev) => {
        let replaced = false;
        return prev.map((m) => {
          if (!replaced && m.id?.toString().startsWith("temp-")) {
            replaced = true;
            return {
              id: msg._id || m.id,
              sender: "user",
              text: m.text,
              confirmed: true,
              time: m.time,
            };
          }
          return m;
        });
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !socketRef.current || !user) return;
    const text = inputText.trim();

    // Optimistic bubble
    setMessages((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        sender: "user",
        text,
        confirmed: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    socketRef.current.emit("user_message", {
      userId: user._id,
      userEmail: user.email,
      message: text,
    });

    setInputText("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .chat-pg {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #07070e;
          color: #f0f0f0;
          display: flex;
          flex-direction: column;
        }

        .chat-outer {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 5rem 1rem 1rem;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .chat-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #0b0b17;
          border: 1px solid #161625;
          border-radius: 20px;
          overflow: hidden;
          min-height: 0;
          height: calc(100vh - 6.5rem);
        }

        /* Topbar */
        .chat-hdr {
          background: #0e0e1c;
          border-bottom: 1px solid #161625;
          padding: 0.9rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .chat-hdr-l {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .back-btn {
          background: none; border: none; cursor: pointer;
          color: #4b5563; padding: 0.25rem;
          border-radius: 8px; display: flex;
          transition: color 0.2s, background 0.2s;
        }
        .back-btn:hover { color: #a78bfa; background: #12122a; }

        .chat-av {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #6d28d9, #1d4ed8);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.82rem;
        }

        .chat-hdr-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.92rem; color: #dde0ff; }
        .chat-hdr-status { font-size: 0.7rem; color: #34d399; margin-top: 0.08rem; }
        .chat-hdr-status.off { color: #4b5563; }

        .chat-badge {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.72rem; color: #4b5563;
          background: #0e0e1c; border: 1px solid #161625;
          border-radius: 20px; padding: 0.3rem 0.7rem;
        }
        .chat-badge svg { color: #6d28d9; }

        /* Messages */
        .chat-msgs {
          flex: 1; overflow-y: auto; padding: 1.1rem 1.2rem;
          display: flex; flex-direction: column; gap: 0.55rem;
          scrollbar-width: thin; scrollbar-color: #161625 transparent;
        }

        .chat-no-msgs {
          margin: auto; text-align: center;
          color: #1c1c2e; display: flex; flex-direction: column;
          align-items: center; gap: 0.6rem;
        }
        .chat-no-msgs p { font-family: 'Syne', sans-serif; font-size: 0.9rem; color: #1c1c2e; }

        .msgrow { display: flex; }
        .msgrow.u { justify-content: flex-end; }
        .msgrow.a { justify-content: flex-start; }

        .msgbub {
          max-width: min(72%, 460px);
          padding: 0.62rem 0.95rem; border-radius: 15px;
          font-size: 0.875rem; line-height: 1.55; word-break: break-word;
        }

        .msgbub.ub { background: linear-gradient(135deg, #6d28d9, #1d4ed8); color: #fff; border-bottom-right-radius: 3px; }
        .msgbub.ab { background: #101025; border: 1px solid #181830; color: #c8d0e8; border-bottom-left-radius: 3px; }

        .msgt {
          font-size: 0.66rem; opacity: .45; text-align: right; margin-top: 0.24rem;
          display: flex; justify-content: flex-end; align-items: center; gap: 0.3rem;
        }
        .msgt.pending { opacity: 0.3; }

        /* Footer */
        .chat-ftr {
          padding: 0.85rem 1.1rem; border-top: 1px solid #161625;
          background: #0e0e1c; display: flex; gap: 0.55rem;
          align-items: center; flex-shrink: 0;
        }

        .chat-inp {
          flex: 1; background: #080814; border: 1px solid #181830;
          border-radius: 11px; padding: 0.68rem 0.95rem;
          color: #f0f0f0; font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; outline: none;
          transition: border-color 0.2s; min-width: 0;
        }
        .chat-inp:focus { border-color: #6d28d9; }
        .chat-inp::placeholder { color: #1a1a2e; }

        .chat-send {
          width: 40px; height: 40px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, #6d28d9, #1d4ed8);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: opacity .18s, transform .15s;
        }
        .chat-send:disabled { opacity: 0.35; cursor: not-allowed; }
        .chat-send:not(:disabled):hover { opacity: .85; transform: scale(1.06); }

        @media (max-width: 600px) {
          .chat-outer { padding-top: 4.5rem; padding-left: 0.5rem; padding-right: 0.5rem; }
          .chat-card { border-radius: 14px; height: calc(100vh - 5.5rem); }
        }
      `}</style>

      <div className="chat-pg">
        <div className="chat-outer">
          <div className="chat-card">
            {/* Header */}
            <div className="chat-hdr">
              <div className="chat-hdr-l">
                <button className="back-btn" onClick={() => navigate(-1)}>
                  <ArrowLeft size={18} />
                </button>
                <div className="chat-av">SC</div>
                <div>
                  <div className="chat-hdr-name">Secure Support</div>
                  <div className={`chat-hdr-status ${connected ? "" : "off"}`}>
                    {connected ? "● Online" : "○ Connecting…"}
                  </div>
                </div>
              </div>
              <div className="chat-badge">
                <ShieldCheck size={13} /> End-to-end
              </div>
            </div>

            {/* Messages */}
            <div className="chat-msgs">
              {messages.length === 0 ? (
                <div className="chat-no-msgs">
                  <ShieldCheck size={36} strokeWidth={1} />
                  <p>Start a secure conversation</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`msgrow ${msg.sender === "user" ? "u" : "a"}`}
                  >
                    <div
                      className={`msgbub ${msg.sender === "user" ? "ub" : "ab"}`}
                    >
                      <div>{msg.text}</div>
                      <div className={`msgt ${msg.confirmed ? "" : "pending"}`}>
                        {msg.time}
                        {!msg.confirmed && " · sending"}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-ftr">
              <input
                className="chat-inp"
                placeholder="Type a message…"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="chat-send"
                onClick={handleSend}
                disabled={!inputText.trim()}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

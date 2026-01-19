// // src/pages/Chat.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Send, Paperclip, MoreVertical, Search, ArrowLeft } from "lucide-react";
// import { io } from "socket.io-client";
// import Navbar from "../components/Navbar";
// import { fetchCurrentUser } from "../services/api.js";

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// export default function Chat() {
//   const [user, setUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate(); // For back navigation

//   /* -------------------------------
//      1️⃣ Load user (SAME AS ACCOUNT)
//   -------------------------------- */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     fetchCurrentUser(token).then((data) => setUser(data));
//   }, []);

//   /* -------------------------------
//      2️⃣ Socket connection (CLONED)
//   -------------------------------- */
//   useEffect(() => {
//     if (!user?._id) return;
//     const socket = io(SOCKET_URL, {
//       transports: ["websocket"],
//     });

//     socketRef.current = socket;

//     console.log("🟢 Chat socket connected");

//     // SAME join event
//     socket.emit("join_chat", { userId: user._id });

//     // SAME history listener
//     socket.on("chat_history", (history) => {
//       setMessages(
//         history.map((msg) => ({
//           id: msg._id,
//           sender: msg.sender,
//           text: msg.message,
//           time: new Date(msg.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         }))
//       );
//     });

//     // SAME incoming message listener
//     socket.on("new_message", (msg) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: msg._id,
//           sender: msg.sender,
//           text: msg.message,
//           time: new Date(msg.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//     });

//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [user?._id]);

//   /* -------------------------------
//      3️⃣ Auto-scroll
//   -------------------------------- */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   /* -------------------------------
//      4️⃣ Send message (IDENTICAL)
//   -------------------------------- */
//   const handleSend = () => {
//     if (!inputText.trim() || !socketRef.current || !user?._id) return;

//     const text = inputText.trim();

//     // Optimistic UI
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         sender: "user",
//         text,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);

//     // SAME emit
//     socketRef.current.emit("user_message", {
//       userId: user._id,
//       message: text,
//     });

//     setInputText("");
//   };

//   /* -------------------------------
//      5️⃣ Back navigation
//   -------------------------------- */
//   const handleBack = () => {
//     navigate(-1); // Go back to previous page
//   };

//   /* -------------------------------
//      UI
//   -------------------------------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
//       <Navbar />

//       <div className="pt-24 px-4 pb-4">
//         <div className="max-w-4xl mx-auto h-[85vh] bg-slate-900/90 rounded-3xl flex flex-col border border-purple-500/30">
//           {/* Header */}
//           <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button onClick={handleBack} className="md:hidden">
//                 <ArrowLeft className="w-6 h-6 text-purple-400" />
//               </button>
//               <button onClick={handleBack} className="hidden md:block">
//                 <ArrowLeft className="w-6 h-6 text-purple-400" />
//               </button>
//               <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
//                 SC
//               </div>
//               <div>
//                 <h2 className="text-white font-semibold">
//                   Secure Support Chat
//                 </h2>
//                 <p className="text-green-400 text-sm">● Online</p>
//               </div>
//             </div>

//             <div className="flex gap-3 text-purple-400">
//               <Search />
//               <MoreVertical />
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-6 space-y-4">
//             {messages.length === 0 && (
//               <p className="text-center text-gray-500 mt-20">
//                 Start chatting with support
//               </p>
//             )}

//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-3 rounded-2xl max-w-md ${
//                     msg.sender === "user"
//                       ? "bg-purple-600 text-white"
//                       : "bg-slate-700 text-gray-100"
//                   }`}
//                 >
//                   <p>{msg.text}</p>
//                   <div className="text-xs opacity-70 text-right mt-1">
//                     {msg.time}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="bg-slate-800 px-6 py-4 flex gap-3">
//             <Paperclip className="text-purple-400" />
//             <input
//               className="flex-1 bg-slate-700 rounded-full px-4 py-2 text-white"
//               placeholder="Type message..."
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               onClick={handleSend}
//               disabled={!inputText.trim()}
//               className="bg-purple-600 p-3 rounded-full text-white"
//             >
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Paperclip, MoreVertical, Search, ArrowLeft } from "lucide-react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import { fetchCurrentUser } from "../services/api.js";

// Dynamic socket URL based on env
const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD.replace("/api", "")
    : import.meta.env.VITE_API_URL_DEV.replace("/api", "");

export default function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // 1️⃣ Load current user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchCurrentUser(token).then((data) => setUser(data));
  }, []);

  // 2️⃣ Connect socket when user is loaded
  useEffect(() => {
    if (!user?._id) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    console.log("🟢 User chat socket connected:", SOCKET_URL);

    // Join chat room
    socket.emit("join_chat", { userId: user._id });

    // Load chat history
    socket.on("chat_history", (history) => {
      setMessages(
        history.map((msg) => ({
          id: msg._id,
          sender: msg.sender,
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })),
      );
    });

    // Listen for new incoming messages
    socket.on("new_message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg._id,
          sender: msg.sender,
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
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

  // 3️⃣ Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 4️⃣ Send message
  const handleSend = () => {
    if (!inputText.trim() || !socketRef.current || !user?._id) return;

    const text = inputText.trim();

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    // Emit to backend
    socketRef.current.emit("user_message", {
      userId: user._id,
      message: text,
    });

    setInputText("");
  };

  // 5️⃣ Back navigation
  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <Navbar />

      <div className="pt-24 px-4 pb-4">
        <div className="max-w-4xl mx-auto h-[85vh] bg-slate-900/90 rounded-3xl flex flex-col border border-purple-500/30">
          {/* Header */}
          <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="md:hidden">
                <ArrowLeft className="w-6 h-6 text-purple-400" />
              </button>
              <button onClick={handleBack} className="hidden md:block">
                <ArrowLeft className="w-6 h-6 text-purple-400" />
              </button>
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div>
                <h2 className="text-white font-semibold">
                  Secure Support Chat
                </h2>
                <p className="text-green-400 text-sm">● Online</p>
              </div>
            </div>

            <div className="flex gap-3 text-purple-400">
              <Search />
              <MoreVertical />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-gray-500 mt-20">
                Start chatting with support
              </p>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl max-w-md ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-slate-700 text-gray-100"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="text-xs opacity-70 text-right mt-1">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-slate-800 px-6 py-4 flex gap-3">
            <Paperclip className="text-purple-400" />
            <input
              className="flex-1 bg-slate-700 rounded-full px-4 py-2 text-white"
              placeholder="Type message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="bg-purple-600 p-3 rounded-full text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

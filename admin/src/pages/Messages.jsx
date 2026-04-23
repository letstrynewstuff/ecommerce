
// // admin/src/pages/Messages.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { Send, ArrowLeft, Search, MoreVertical, Users } from "lucide-react";
// import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";

// /* =========================
//    SOCKET URL
// ========================= */
// const SOCKET_URL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_API_URL_PROD.replace("/api", "")
//     : import.meta.env.VITE_API_URL_DEV?.replace("/api", "") ||
//       "http://localhost:5000";

// export default function Messages() {
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // 🔥 Store messages PER USER
//   const [messagesByUser, setMessagesByUser] = useState({});

//   const [inputText, setInputText] = useState("");

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   /* =========================
//      SOCKET CONNECTION (RUNS ONCE)
//   ========================= */
//   useEffect(() => {
//     // const socket = io(SOCKET_URL, { transports: ["websocket"] });
//     const socket = io(SOCKET_URL);
//     socketRef.current = socket;

//     console.log("🟢 Admin socket connected");

//     socket.emit("join_admin");

//     /* =========================
//        USER MESSAGE RECEIVED
//     ========================= */
//     socket.on("admin_receive_message", (msg) => {
//       // Add/update user in sidebar
//       setConnectedUsers((prev) => {
//         const exists = prev.find((u) => u.userId === msg.userId);

//         if (exists) {
//           return prev.map((u) =>
//             u.userId === msg.userId
//               ? { ...u, hasUnread: selectedUser?.userId !== msg.userId }
//               : u,
//           );
//         }

//         return [
//           ...prev,
//           {
//             userId: msg.userId,
//             name: "User",
//             hasUnread: true,
//           },
//         ];
//       });

//       // Store message under correct user
//       setMessagesByUser((prev) => ({
//         ...prev,
//         [msg.userId]: [
//           ...(prev[msg.userId] || []),
//           {
//             id: msg._id,
//             sender: "user",
//             text: msg.message,
//             time: new Date(msg.createdAt).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           },
//         ],
//       }));
//     });

//     /* =========================
//        CHAT HISTORY RECEIVED
//     ========================= */
//     socket.on("chat_history", (history) => {
//       if (!selectedUser) return;

//       setMessagesByUser((prev) => ({
//         ...prev,
//         [selectedUser.userId]: history.map((msg) => ({
//           id: msg._id,
//           sender: msg.sender,
//           text: msg.message,
//           time: new Date(msg.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         })),
//       }));
//     });

//     return () => socket.disconnect();
//   }, []);

//   /* =========================
//      SELECT USER
//   ========================= */
//   const selectUser = (user) => {
//     setSelectedUser(user);

//     // Clear unread badge
//     setConnectedUsers((prev) =>
//       prev.map((u) =>
//         u.userId === user.userId ? { ...u, hasUnread: false } : u,
//       ),
//     );

//     // Request history
//     socketRef.current.emit("get_chat_history", {
//       userId: user.userId,
//     });
//   };

//   /* =========================
//      SEND MESSAGE
//   ========================= */
//   const handleSend = () => {
//     if (!inputText.trim() || !selectedUser) return;

//     const tempMsg = {
//       id: `temp-${Date.now()}`,
//       sender: "admin",
//       text: inputText,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     // Update UI instantly
//     setMessagesByUser((prev) => ({
//       ...prev,
//       [selectedUser.userId]: [
//         ...(prev[selectedUser.userId] || []),
//         tempMsg,
//       ],
//     }));

//     socketRef.current.emit("admin_message", {
//       userId: selectedUser.userId,
//       message: inputText,
//     });

//     setInputText("");
//   };

//   /* =========================
//      AUTO SCROLL
//   ========================= */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messagesByUser, selectedUser]);

//   /* =========================
//      CURRENT USER MESSAGES
//   ========================= */
//   const currentMessages =
//     messagesByUser[selectedUser?.userId] || [];

//   /* =========================
//      RENDER
//   ========================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex flex-col md:flex-row">
//       {/* ====== SIDEBAR ====== */}
//       <div
//         className={`w-full md:w-80 bg-slate-900 border-b md:border-r border-purple-500/30 ${
//           selectedUser ? "hidden md:block" : "block"
//         }`}
//       >
//         <div className="p-6 border-b border-purple-500/20">
//           <div className="flex items-center gap-3">
//             <button onClick={() => navigate(-1)} className="text-purple-400">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
//               <Users /> Active Chats
//             </h2>
//           </div>
//           <p className="text-sm text-gray-400 mt-1">
//             {connectedUsers.length} users
//           </p>
//         </div>

//         <div className="overflow-y-auto max-h-[75vh]">
//           {connectedUsers.length === 0 ? (
//             <p className="text-center text-gray-500 mt-10">
//               No active chats
//             </p>
//           ) : (
//             connectedUsers.map((user) => (
//               <div
//                 key={user.userId}
//                 onClick={() => selectUser(user)}
//                 className={`p-4 cursor-pointer border-b border-purple-500/10 hover:bg-purple-900/30 ${
//                   selectedUser?.userId === user.userId
//                     ? "bg-purple-900/40"
//                     : ""
//                 }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <p className="text-white font-medium">
//                     User {user.userId.slice(-4)}
//                   </p>
//                   {user.hasUnread && (
//                     <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* ====== CHAT AREA ====== */}
//       <div className="flex-1 flex flex-col">
//         {selectedUser ? (
//           <>
//             {/* HEADER */}
//             <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-purple-500/20">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => setSelectedUser(null)}
//                   className="md:hidden text-purple-400"
//                 >
//                   <ArrowLeft className="w-6 h-6" />
//                 </button>
//                 <h2 className="text-white font-semibold">
//                   Chat with User {selectedUser.userId.slice(-4)}
//                 </h2>
//               </div>
//               <div className="flex gap-3 text-purple-400">
//                 <Search />
//                 <MoreVertical />
//               </div>
//             </div>

//             {/* MESSAGES */}
//             <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
//               {currentMessages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${
//                     msg.sender === "admin"
//                       ? "justify-end"
//                       : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`px-4 py-2 rounded-2xl max-w-md break-words ${
//                       msg.sender === "admin"
//                         ? "bg-purple-600 text-white"
//                         : "bg-slate-700 text-gray-100"
//                     }`}
//                   >
//                     <p>{msg.text}</p>
//                     <p className="text-xs opacity-70 text-right mt-1">
//                       {msg.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* INPUT */}
//             <div className="p-4 bg-slate-800 border-t border-purple-500/20 flex gap-3 items-center">
//               <input
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type your message..."
//                 className="flex-1 px-4 py-2 rounded-full bg-slate-700 text-white outline-none"
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-purple-600 p-3 rounded-full hover:bg-purple-700"
//               >
//                 <Send className="text-white" />
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-400">
//             Select a user to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // admin/src/pages/Messages.jsx
// import React, { useState, useEffect, useRef,  } from "react";
// import { Send, ArrowLeft, Search, MoreVertical, Users, Circle } from "lucide-react";
// import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";

// const SOCKET_URL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_API_URL_PROD.replace("/api", "")
//     : import.meta.env.VITE_API_URL_DEV?.replace("/api", "") ||
//       "http://localhost:5000";

// export default function Messages() {
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messagesByUser, setMessagesByUser] = useState({});
//   const [inputText, setInputText] = useState("");

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const selectedUserRef = useRef(null); // ✅ FIX: ref to avoid stale closure
//   const navigate = useNavigate();

//   // Keep ref in sync
//   useEffect(() => {
//     selectedUserRef.current = selectedUser;
//   }, [selectedUser]);

//   useEffect(() => {
//     const socket = io(SOCKET_URL);
//     socketRef.current = socket;

//     socket.emit("join_admin");

//     /* ===== USER MESSAGE RECEIVED ===== */
//     socket.on("admin_receive_message", (msg) => {
//       setConnectedUsers((prev) => {
//         const exists = prev.find((u) => u.userId === msg.userId);
//         const isSelected = selectedUserRef.current?.userId === msg.userId;

//         if (exists) {
//           return prev.map((u) =>
//             u.userId === msg.userId
//               ? { ...u, hasUnread: !isSelected }
//               : u
//           );
//         }

//         return [
//           ...prev,
//           {
//             userId: msg.userId,
//             // ✅ FIX: Use real name from server payload
//             name: msg.name || `User …${msg.userId.slice(-4)}`,
//             hasUnread: !isSelected,
//           },
//         ];
//       });

//       setMessagesByUser((prev) => {
//         const existing = prev[msg.userId] || [];
//         // Avoid duplicate if it's the admin's own optimistic message
//         const alreadyExists = existing.some((m) => m.id === msg._id);
//         if (alreadyExists) return prev;

//         return {
//           ...prev,
//           [msg.userId]: [
//             ...existing,
//             {
//               id: msg._id || `srv-${Date.now()}`,
//               sender: msg.sender,
//               text: msg.message,
//               time: new Date(msg.createdAt).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               }),
//             },
//           ],
//         };
//       });
//     });

//     /* ===== CHAT HISTORY ===== */
//     // ✅ FIX: Use ref instead of state — no stale closure
//     socket.on("chat_history", (history) => {
//       const current = selectedUserRef.current;
//       if (!current) return;

//       setMessagesByUser((prev) => ({
//         ...prev,
//         [current.userId]: history.map((msg) => ({
//           id: msg._id,
//           sender: msg.sender,
//           text: msg.message,
//           time: new Date(msg.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         })),
//       }));
//     });

//     return () => socket.disconnect();
//   }, []);

//   /* ===== SELECT USER ===== */
//   const selectUser = (user) => {
//     setSelectedUser(user);
//     selectedUserRef.current = user;

//     setConnectedUsers((prev) =>
//       prev.map((u) =>
//         u.userId === user.userId ? { ...u, hasUnread: false } : u
//       )
//     );

//     socketRef.current.emit("get_chat_history", { userId: user.userId });
//   };

//   /* ===== SEND MESSAGE ===== */
//   const handleSend = () => {
//     if (!inputText.trim() || !selectedUser) return;

//     const tempMsg = {
//       id: `temp-${Date.now()}`,
//       sender: "admin",
//       text: inputText,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setMessagesByUser((prev) => ({
//       ...prev,
//       [selectedUser.userId]: [...(prev[selectedUser.userId] || []), tempMsg],
//     }));

//     socketRef.current.emit("admin_message", {
//       userId: selectedUser.userId,
//       message: inputText,
//     });

//     setInputText("");
//   };

//   /* ===== AUTO SCROLL ===== */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messagesByUser, selectedUser]);

//   const currentMessages = messagesByUser[selectedUser?.userId] || [];

//   return (
//     <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         .msg-root {
//           display: flex;
//           height: 100vh;
//           background: #08080f;
//           color: #f0f0f0;
//           overflow: hidden;
//         }

//         /* ---- SIDEBAR ---- */
//         .msg-sidebar {
//           width: 300px;
//           flex-shrink: 0;
//           background: #0f0f1a;
//           border-right: 1px solid #1a1a2e;
//           display: flex;
//           flex-direction: column;
//           transition: transform 0.25s ease;
//         }

//         .sidebar-header {
//           padding: 1.25rem 1.25rem 1rem;
//           border-bottom: 1px solid #1a1a2e;
//         }

//         .sidebar-back {
//           background: none;
//           border: none;
//           color: #6b7280;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 0.4rem;
//           font-size: 0.82rem;
//           font-family: 'DM Sans', sans-serif;
//           margin-bottom: 0.85rem;
//           transition: color 0.2s;
//         }

//         .sidebar-back:hover { color: #a78bfa; }

//         .sidebar-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.1rem;
//           font-weight: 800;
//           color: #e0e0ff;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           margin-bottom: 0.2rem;
//         }

//         .sidebar-count {
//           font-size: 0.78rem;
//           color: #4b5563;
//         }

//         .sidebar-list {
//           flex: 1;
//           overflow-y: auto;
//           scrollbar-width: thin;
//           scrollbar-color: #1e1e2e transparent;
//         }

//         .sidebar-empty {
//           padding: 3rem 1rem;
//           text-align: center;
//           color: #374151;
//           font-size: 0.88rem;
//         }

//         .user-item {
//           padding: 1rem 1.25rem;
//           cursor: pointer;
//           border-bottom: 1px solid #12121f;
//           transition: background 0.15s;
//           display: flex;
//           align-items: center;
//           gap: 0.85rem;
//         }

//         .user-item:hover { background: #13131f; }
//         .user-item.active { background: #161628; }

//         .user-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 12px;
//           background: linear-gradient(135deg, #7c3aed44, #2563eb44);
//           border: 1px solid #2a2a4a;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: 'Syne', sans-serif;
//           font-weight: 700;
//           font-size: 0.85rem;
//           color: #a78bfa;
//           flex-shrink: 0;
//         }

//         .user-info { flex: 1; min-width: 0; }

//         .user-name {
//           font-weight: 500;
//           font-size: 0.9rem;
//           color: #e5e7eb;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .user-id {
//           font-size: 0.72rem;
//           color: #4b5563;
//           margin-top: 0.1rem;
//         }

//         .unread-dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background: #34d399;
//           flex-shrink: 0;
//           box-shadow: 0 0 6px #34d39966;
//           animation: pulse 1.5s infinite;
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.4; }
//         }

//         /* ---- CHAT AREA ---- */
//         .msg-chat {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//         }

//         .chat-placeholder {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           color: #2a2a3a;
//           gap: 0.75rem;
//         }

//         .chat-placeholder p {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.1rem;
//           color: #2a2a3a;
//         }

//         .chat-topbar {
//           background: #0f0f1a;
//           border-bottom: 1px solid #1a1a2e;
//           padding: 1rem 1.5rem;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           flex-shrink: 0;
//         }

//         .topbar-left {
//           display: flex;
//           align-items: center;
//           gap: 0.85rem;
//         }

//         .topbar-back {
//           display: none;
//           background: none;
//           border: none;
//           color: #6b7280;
//           cursor: pointer;
//         }

//         .topbar-name {
//           font-family: 'Syne', sans-serif;
//           font-weight: 700;
//           font-size: 1rem;
//           color: #e0e0ff;
//         }

//         .topbar-sub {
//           font-size: 0.73rem;
//           color: #34d399;
//           margin-top: 0.1rem;
//         }

//         .topbar-actions {
//           display: flex;
//           gap: 0.75rem;
//           color: #4b5563;
//           cursor: pointer;
//         }

//         .topbar-actions svg:hover { color: #a78bfa; }

//         .chat-body {
//           flex: 1;
//           overflow-y: auto;
//           padding: 1.5rem;
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//           scrollbar-width: thin;
//           scrollbar-color: #1e1e2e transparent;
//         }

//         .bubble-row {
//           display: flex;
//         }

//         .bubble-row.right { justify-content: flex-end; }
//         .bubble-row.left { justify-content: flex-start; }

//         .bubble {
//           max-width: 68%;
//           padding: 0.7rem 1rem;
//           border-radius: 18px;
//           font-size: 0.9rem;
//           line-height: 1.55;
//           word-break: break-word;
//         }

//         .bubble.admin-bubble {
//           background: linear-gradient(135deg, #7c3aed, #2563eb);
//           color: white;
//           border-bottom-right-radius: 4px;
//         }

//         .bubble.user-bubble {
//           background: #151525;
//           border: 1px solid #1e1e2e;
//           color: #d1d5db;
//           border-bottom-left-radius: 4px;
//         }

//         .bubble-time {
//           font-size: 0.68rem;
//           opacity: 0.55;
//           text-align: right;
//           margin-top: 0.3rem;
//         }

//         .chat-footer {
//           padding: 1rem 1.25rem;
//           border-top: 1px solid #1a1a2e;
//           background: #0f0f1a;
//           display: flex;
//           gap: 0.65rem;
//           align-items: center;
//           flex-shrink: 0;
//         }

//         .chat-footer input {
//           flex: 1;
//           background: #0d0d16;
//           border: 1px solid #1e1e2e;
//           border-radius: 12px;
//           padding: 0.72rem 1rem;
//           color: #f0f0f0;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.9rem;
//           outline: none;
//           transition: border-color 0.2s;
//         }

//         .chat-footer input:focus { border-color: #7c3aed; }
//         .chat-footer input::placeholder { color: #2a2a3a; }

//         .send-btn {
//           width: 44px;
//           height: 44px;
//           border-radius: 12px;
//           border: none;
//           background: linear-gradient(135deg, #7c3aed, #2563eb);
//           color: white;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: opacity 0.2s, transform 0.15s;
//           flex-shrink: 0;
//         }

//         .send-btn:hover { opacity: 0.85; transform: scale(1.07); }

//         /* ---- MOBILE ---- */
//         @media (max-width: 640px) {
//           .msg-sidebar {
//             position: fixed;
//             top: 0; left: 0; bottom: 0;
//             z-index: 10;
//             width: 100%;
//           }

//           .msg-sidebar.hidden-mobile { transform: translateX(-100%); }

//           .msg-chat { width: 100%; }

//           .topbar-back { display: flex; }
//         }
//       `}</style>

//       <div className="msg-root">
//         {/* SIDEBAR */}
//         <div className={`msg-sidebar ${selectedUser ? "hidden-mobile" : ""}`}>
//           <div className="sidebar-header">
//             <button className="sidebar-back" onClick={() => navigate(-1)}>
//               <ArrowLeft size={14} /> Dashboard
//             </button>
//             <div className="sidebar-title">
//               <Users size={18} /> Active Chats
//             </div>
//             <div className="sidebar-count">{connectedUsers.length} conversation{connectedUsers.length !== 1 ? "s" : ""}</div>
//           </div>

//           <div className="sidebar-list">
//             {connectedUsers.length === 0 ? (
//               <div className="sidebar-empty">No active chats yet</div>
//             ) : (
//               connectedUsers.map((user) => (
//                 <div
//                   key={user.userId}
//                   className={`user-item ${selectedUser?.userId === user.userId ? "active" : ""}`}
//                   onClick={() => selectUser(user)}
//                 >
//                   <div className="user-avatar">
//                     {/* ✅ Show initials from real name */}
//                     {(user.name || "U")[0].toUpperCase()}
//                   </div>
//                   <div className="user-info">
//                     {/* ✅ Show real username */}
//                     <div className="user-name">{user.name}</div>
//                     <div className="user-id">ID: …{user.userId.slice(-6)}</div>
//                   </div>
//                   {user.hasUnread && <div className="unread-dot" />}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* CHAT AREA */}
//         <div className="msg-chat">
//           {selectedUser ? (
//             <>
//               <div className="chat-topbar">
//                 <div className="topbar-left">
//                   <button className="topbar-back" onClick={() => setSelectedUser(null)}>
//                     <ArrowLeft size={20} />
//                   </button>
//                   <div className="user-avatar" style={{ width: 38, height: 38, borderRadius: 10 }}>
//                     {(selectedUser.name || "U")[0].toUpperCase()}
//                   </div>
//                   <div>
//                     <div className="topbar-name">{selectedUser.name}</div>
//                     <div className="topbar-sub">● Active now</div>
//                   </div>
//                 </div>
//                 <div className="topbar-actions">
//                   <Search size={18} />
//                   <MoreVertical size={18} />
//                 </div>
//               </div>

//               <div className="chat-body">
//                 {currentMessages.map((msg) => (
//                   <div
//                     key={msg.id}
//                     className={`bubble-row ${msg.sender === "admin" ? "right" : "left"}`}
//                   >
//                     <div className={`bubble ${msg.sender === "admin" ? "admin-bubble" : "user-bubble"}`}>
//                       <p>{msg.text}</p>
//                       <p className="bubble-time">{msg.time}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               <div className="chat-footer">
//                 <input
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                   placeholder={`Message ${selectedUser.name}…`}
//                 />
//                 <button className="send-btn" onClick={handleSend}>
//                   <Send size={16} />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="chat-placeholder">
//               <Users size={48} strokeWidth={1} />
//               <p>Select a conversation</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// admin/src/pages/Messages.jsx
import React, { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, Search, MoreVertical, Users, ExternalLink } from "lucide-react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD.replace("/api", "")
    : import.meta.env.VITE_API_URL_DEV?.replace("/api", "") ||
      "http://localhost:5000";

export default function Messages() {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messagesByUser, setMessagesByUser] = useState({});
  const [inputText, setInputText] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const selectedUserRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;
    socket.emit("join_admin");

    /* ===== FIX 1: Sidebar persists after reload ===== */
    socket.on("recent_conversations", (conversations) => {
      setConnectedUsers(
        conversations.map((c) => ({
          userId: c.userId,
          name: c.name,
          hasUnread: false,
        }))
      );
    });

    /* ===== Live: new user message ===== */
    socket.on("admin_receive_message", (msg) => {
      // FIX 2: Only handle user messages here — skip admin echoes
      if (msg.sender !== "user") return;

      setConnectedUsers((prev) => {
        const exists = prev.find((u) => u.userId === msg.userId);
        const isSelected = selectedUserRef.current?.userId === msg.userId;

        if (exists) {
          return prev.map((u) =>
            u.userId === msg.userId ? { ...u, hasUnread: !isSelected } : u
          );
        }
        return [
          ...prev,
          {
            userId: msg.userId,
            name: msg.name || `User …${msg.userId.slice(-4)}`,
            hasUnread: !isSelected,
          },
        ];
      });

      setMessagesByUser((prev) => {
        const existing = prev[msg.userId] || [];
        if (existing.some((m) => m.id === msg._id)) return prev;
        return {
          ...prev,
          [msg.userId]: [
            ...existing,
            {
              id: msg._id,
              sender: "user",
              text: msg.message,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        };
      });
    });

    /* ===== FIX 3: Replace temp bubble — no doubles ===== */
    socket.on("admin_message_confirmed", (msg) => {
      setMessagesByUser((prev) => {
        const existing = prev[msg.userId] || [];
        let replaced = false;
        const updated = existing.map((m) => {
          if (!replaced && m.id?.toString().startsWith("temp-")) {
            replaced = true;
            return {
              id: msg._id,
              sender: "admin",
              text: msg.message,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          }
          return m;
        });
        return { ...prev, [msg.userId]: updated };
      });
    });

    /* ===== Chat history (on user select) ===== */
    socket.on("chat_history", (history) => {
      const current = selectedUserRef.current;
      if (!current) return;
      setMessagesByUser((prev) => ({
        ...prev,
        [current.userId]: history.map((msg) => ({
          id: msg._id,
          sender: msg.sender,
          text: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })),
      }));
    });

    return () => socket.disconnect();
  }, []);

  const selectUser = (user) => {
    setSelectedUser(user);
    selectedUserRef.current = user;
    setConnectedUsers((prev) =>
      prev.map((u) => (u.userId === user.userId ? { ...u, hasUnread: false } : u))
    );
    socketRef.current.emit("get_chat_history", { userId: user.userId });
  };

  const handleSend = () => {
    if (!inputText.trim() || !selectedUser) return;
    const tempId = `temp-${Date.now()}`;

    setMessagesByUser((prev) => ({
      ...prev,
      [selectedUser.userId]: [
        ...(prev[selectedUser.userId] || []),
        {
          id: tempId,
          sender: "admin",
          text: inputText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    }));

    socketRef.current.emit("admin_message", {
      userId: selectedUser.userId,
      message: inputText,
    });

    setInputText("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesByUser, selectedUser]);

  const currentMessages = messagesByUser[selectedUser?.userId] || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root { height: 100%; overflow: hidden; background: #07070e; }

        .mw {
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          inset: 0;
          display: flex;
          background: #07070e;
          color: #f0f0f0;
          overflow: hidden;
        }

        /* ===== SIDEBAR ===== */
        .msb {
          width: 272px;
          flex-shrink: 0;
          background: #0b0b17;
          border-right: 1px solid #161625;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.22s ease;
        }

        .msb-top {
          padding: 1.3rem 1.1rem 0.9rem;
          border-bottom: 1px solid #161625;
          flex-shrink: 0;
        }

        .msb-back {
          background: none; border: none;
          color: #374151; cursor: pointer;
          display: flex; align-items: center; gap: 0.35rem;
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem;
          margin-bottom: 0.9rem; padding: 0;
          transition: color 0.2s;
        }
        .msb-back:hover { color: #a78bfa; }

        .msb-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 800; color: #dde0ff;
          display: flex; align-items: center; gap: 0.4rem;
          margin-bottom: 0.15rem;
        }

        .msb-sub { font-size: 0.72rem; color: #2e2e45; }

        .msb-list {
          flex: 1; overflow-y: auto;
          scrollbar-width: thin; scrollbar-color: #161625 transparent;
        }

        .msb-empty {
          padding: 3rem 1.2rem; text-align: center;
          color: #1e1e2e; font-size: 0.83rem; line-height: 1.6;
        }

        .urow {
          display: flex; align-items: center; gap: 0.7rem;
          padding: 0.85rem 1.1rem;
          cursor: pointer; border-bottom: 1px solid #0e0e1c;
          transition: background 0.13s; min-width: 0;
        }
        .urow:hover { background: #0e0e1c; }
        .urow.sel { background: #11112a; border-left: 2px solid #7c3aed; }

        .uav {
          width: 36px; height: 36px; border-radius: 9px;
          background: linear-gradient(135deg, #7c3aed28, #2563eb28);
          border: 1px solid #24244a;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 0.8rem; color: #9f75e8; flex-shrink: 0;
        }

        .uinfo { flex: 1; min-width: 0; }
        .uname { font-size: 0.86rem; font-weight: 500; color: #e2e5f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .uhint { font-size: 0.68rem; color: #2e2e45; margin-top: 0.1rem; }

        .upip {
          width: 7px; height: 7px; border-radius: 50%;
          background: #34d399; box-shadow: 0 0 6px #34d39950;
          flex-shrink: 0; animation: pip 1.6s ease-in-out infinite;
        }
        @keyframes pip { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

        /* ===== CHAT PANEL ===== */
        .mcp {
          flex: 1; display: flex; flex-direction: column;
          height: 100%; overflow: hidden; min-width: 0;
        }

        .mcp-empty {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.75rem;
        }
        .mcp-empty span {
          font-family: 'Syne', sans-serif; font-size: 0.95rem; color: #1c1c2e;
        }

        /* Topbar */
        .ctb {
          background: #0b0b17; border-bottom: 1px solid #161625;
          padding: 0.8rem 1.3rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
        }

        .ctb-l { display: flex; align-items: center; gap: 0.7rem; }

        .mob-back {
          display: none; background: none; border: none;
          color: #4b5563; cursor: pointer; padding: 0;
        }

        .ctb-name { font-family:'Syne',sans-serif; font-weight:700; font-size:0.9rem; color:#dde0ff; }
        .ctb-status { font-size:0.7rem; color:#34d399; margin-top:0.1rem; }

        .ctb-r { display:flex; align-items:center; gap:0.4rem; }

        .icon-btn {
          background: none; border: none; color: #2a2a42;
          cursor: pointer; padding: 0.32rem 0.38rem; border-radius: 8px;
          display: flex; align-items: center;
          transition: color 0.18s, background 0.18s;
          text-decoration: none;
        }
        .icon-btn:hover { color: #a78bfa; background: #11112a; }

        /* Messages */
        .cbody {
          flex: 1; overflow-y: auto; padding: 1.1rem 1.3rem;
          display: flex; flex-direction: column; gap: 0.55rem;
          scrollbar-width: thin; scrollbar-color: #161625 transparent;
        }

        .br { display: flex; }
        .br.r { justify-content: flex-end; }
        .br.l { justify-content: flex-start; }

        .bb {
          max-width: min(66%, 480px);
          padding: 0.6rem 0.95rem; border-radius: 15px;
          font-size: 0.875rem; line-height: 1.55; word-break: break-word;
        }
        .bb.m { background: linear-gradient(135deg,#6d28d9,#1d4ed8); color:#fff; border-bottom-right-radius:3px; }
        .bb.t { background:#101025; border:1px solid #181830; color:#c8d0e8; border-bottom-left-radius:3px; }

        .bbt { font-size:0.66rem; opacity:.45; text-align:right; margin-top:0.25rem; }

        /* Footer */
        .cfooter {
          padding: 0.8rem 1.1rem; border-top: 1px solid #161625;
          background: #0b0b17; display: flex; gap: 0.55rem;
          align-items: center; flex-shrink: 0;
        }

        .cinput {
          flex: 1; background: #080814; border: 1px solid #181830;
          border-radius: 11px; padding: 0.68rem 0.95rem;
          color: #f0f0f0; font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; outline: none;
          transition: border-color 0.2s; min-width: 0;
        }
        .cinput:focus { border-color: #6d28d9; }
        .cinput::placeholder { color: #1a1a2e; }

        .sbtn {
          width: 40px; height: 40px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, #6d28d9, #1d4ed8);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: opacity .18s, transform .15s;
        }
        .sbtn:hover { opacity:.85; transform:scale(1.06); }

        /* Mobile */
        @media (max-width: 600px) {
          .msb {
            position: fixed; top:0; left:0; bottom:0;
            z-index: 20; width: 100vw;
          }
          .msb.out { transform: translateX(-100%); }
          .mob-back { display: flex; }
        }
      `}</style>

      <div className="mw">

        {/* SIDEBAR */}
        <div className={`msb ${selectedUser ? "out" : ""}`}>
          <div className="msb-top">
            <button className="msb-back" onClick={() => navigate(-1)}>
              <ArrowLeft size={13} /> Dashboard
            </button>
            <div className="msb-title"><Users size={16} /> Conversations</div>
            <div className="msb-sub">
              {connectedUsers.length} user{connectedUsers.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="msb-list">
            {connectedUsers.length === 0 ? (
              <div className="msb-empty">No conversations yet.<br />Messages will appear here.</div>
            ) : (
              connectedUsers.map((u) => (
                <div
                  key={u.userId}
                  className={`urow ${selectedUser?.userId === u.userId ? "sel" : ""}`}
                  onClick={() => selectUser(u)}
                >
                  <div className="uav">{(u.name || "U")[0].toUpperCase()}</div>
                  <div className="uinfo">
                    <div className="uname">{u.name}</div>
                    <div className="uhint">…{u.userId.slice(-8)}</div>
                  </div>
                  {u.hasUnread && <div className="upip" />}
                </div>
              ))
            )}
          </div>
        </div>

        {/* CHAT PANEL */}
        <div className="mcp">
          {selectedUser ? (
            <>
              <div className="ctb">
                <div className="ctb-l">
                  <button className="mob-back" onClick={() => setSelectedUser(null)}>
                    <ArrowLeft size={19} />
                  </button>
                  <div className="uav" style={{ width:34, height:34, borderRadius:8 }}>
                    {(selectedUser.name || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="ctb-name">{selectedUser.name}</div>
                    <div className="ctb-status">● Active now</div>
                  </div>
                </div>
                <div className="ctb-r">
                  {/* ✅ Opens user's chat page in new tab */}
                  <a
                    href={`/chat`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    title="View user chat page"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button className="icon-btn"><Search size={16} /></button>
                  <button className="icon-btn"><MoreVertical size={16} /></button>
                </div>
              </div>

              <div className="cbody">
                {currentMessages.map((msg) => (
                  <div key={msg.id} className={`br ${msg.sender === "admin" ? "r" : "l"}`}>
                    <div className={`bb ${msg.sender === "admin" ? "m" : "t"}`}>
                      <div>{msg.text}</div>
                      <div className="bbt">{msg.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="cfooter">
                <input
                  className="cinput"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={`Reply to ${selectedUser.name}…`}
                />
                <button className="sbtn" onClick={handleSend}>
                  <Send size={15} />
                </button>
              </div>
            </>
          ) : (
            <div className="mcp-empty">
              <Users size={42} strokeWidth={1} color="#1c1c2e" />
              <span>Select a conversation</span>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
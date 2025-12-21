// import React, { useState, useEffect, useRef } from "react";
// import {
//   Send,
//   ArrowLeft,
//   Phone,
//   Video,
//   Search,
//   MoreVertical,
//   Users,
// } from "lucide-react";
// import { io } from "socket.io-client";

// const SOCKET_URL = "http://localhost:5000";

// export default function Messages() {
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Scroll chat to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // CONNECT SOCKET
//   useEffect(() => {
//     const socket = io(SOCKET_URL);
//     socketRef.current = socket;

//     console.log("🟢 Admin socket connected");

//     // RECEIVE MESSAGE FROM USER
//     socket.on("admin_receive_message", (msg) => {
//       // Add user to sidebar if not exists
//       setConnectedUsers((prev) => {
//         const exists = prev.find((u) => u.userId === msg.userId);
//         if (exists) {
//           return prev.map((u) =>
//             u.userId === msg.userId ? { ...u, hasUnread: true } : u
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

//       // If admin is chatting with this user → append message
//       if (selectedUser?.userId === msg.userId) {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: msg._id,
//             sender: "user",
//             text: msg.message,
//             time: new Date(msg.createdAt).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           },
//         ]);
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [selectedUser]);

//   // LOAD CHAT HISTORY (from backend DB via socket)
//   const selectUser = (user) => {
//     setSelectedUser(user);

//     setMessages([]); // clear current chat

//     // Remove unread badge
//     setConnectedUsers((prev) =>
//       prev.map((u) =>
//         u.userId === user.userId ? { ...u, hasUnread: false } : u
//       )
//     );
//   };

//   // SEND MESSAGE
//   const handleSend = () => {
//     if (!inputText.trim() || !selectedUser) return;

//     const msg = {
//       id: Date.now(),
//       sender: "admin",
//       text: inputText,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     // Update UI immediately
//     setMessages((prev) => [...prev, msg]);

//     // Send to backend
//     socketRef.current.emit("admin_message", {
//       userId: selectedUser.userId,
//       message: inputText,
//     });

//     setInputText("");
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
//       {/* SIDEBAR */}
//       <div className="w-80 bg-slate-900 border-r border-purple-500/30">
//         <div className="p-6 border-b border-purple-500/20">
//           <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
//             <Users /> Active Chats
//           </h2>
//           <p className="text-sm text-gray-400 mt-1">
//             {connectedUsers.length} users
//           </p>
//         </div>

//         <div className="overflow-y-auto">
//           {connectedUsers.length === 0 ? (
//             <p className="text-center text-gray-500 mt-10">No active chats</p>
//           ) : (
//             connectedUsers.map((user) => (
//               <div
//                 key={user.userId}
//                 onClick={() => selectUser(user)}
//                 className={`p-4 cursor-pointer hover:bg-purple-900/30 border-b border-purple-500/10 ${
//                   selectedUser?.userId === user.userId ? "bg-purple-900/40" : ""
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium text-white">
//                       User {user.userId.slice(-4)}
//                     </p>
//                     <p className="text-xs text-gray-400">Click to chat</p>
//                   </div>
//                   {user.hasUnread && (
//                     <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 flex flex-col">
//         {selectedUser ? (
//           <>
//             {/* HEADER */}
//             <div className="px-6 py-4 bg-slate-800 border-b border-purple-500/20 flex justify-between">
//               <h2 className="text-white font-semibold">
//                 Chat with User {selectedUser.userId.slice(-4)}
//               </h2>
//               <div className="flex gap-3 text-purple-400">
//                 <Phone />
//                 <Video />
//                 <Search />
//                 <MoreVertical />
//               </div>
//             </div>

//             {/* MESSAGES */}
//             <div className="flex-1 overflow-y-auto p-6 space-y-4">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${
//                     msg.sender === "admin" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`px-4 py-2 rounded-2xl max-w-md ${
//                       msg.sender === "admin"
//                         ? "bg-purple-600 text-white"
//                         : "bg-slate-700 text-gray-100"
//                     }`}
//                   >
//                     <p>{msg.text}</p>
//                     <p className="text-xs mt-1 opacity-70 text-right">
//                       {msg.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* INPUT */}
//             <div className="p-4 bg-slate-800 border-t border-purple-500/20 flex gap-3">
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


// admin/src/pages/Messages.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  ArrowLeft,
  Phone,
  Video,
  Search,
  MoreVertical,
  Users,
} from "lucide-react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const SOCKET_URL = "http://localhost:5000";

export default function Messages() {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // CONNECT SOCKET
  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    console.log("🟢 Admin socket connected");

    // RECEIVE MESSAGE FROM USER
    socket.on("admin_receive_message", (msg) => {
      // Add user to sidebar if not exists
      setConnectedUsers((prev) => {
        const exists = prev.find((u) => u.userId === msg.userId);
        if (exists) {
          return prev.map((u) =>
            u.userId === msg.userId ? { ...u, hasUnread: true } : u
          );
        }

        return [
          ...prev,
          {
            userId: msg.userId,
            name: "User",
            hasUnread: true,
          },
        ];
      });

      // If admin is chatting with this user → append message
      if (selectedUser?.userId === msg.userId) {
        setMessages((prev) => [
          ...prev,
          {
            id: msg._id,
            sender: "user",
            text: msg.message,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUser]);

  // LOAD CHAT HISTORY (from backend DB via socket)
  const selectUser = (user) => {
    setSelectedUser(user);

    setMessages([]); // clear current chat

    // Remove unread badge
    setConnectedUsers((prev) =>
      prev.map((u) =>
        u.userId === user.userId ? { ...u, hasUnread: false } : u
      )
    );
  };

  // SEND MESSAGE
  const handleSend = () => {
    if (!inputText.trim() || !selectedUser) return;

    const msg = {
      id: Date.now(),
      sender: "admin",
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update UI immediately
    setMessages((prev) => [...prev, msg]);

    // Send to backend
    socketRef.current.emit("admin_message", {
      userId: selectedUser.userId,
      message: inputText,
    });

    setInputText("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex flex-col md:flex-row">
      {/* User List Sidebar - Hidden on mobile when chat is open */}
      <div
        className={`w-full md:w-80 bg-slate-900 border-b md:border-r border-purple-500/30 ${
          selectedUser ? "hidden md:block" : "block"
        }`}
      >
        <div className="p-6 border-b border-purple-500/20">
          {/* <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
            <Users /> Active Chats
          </h2> */}
          <div className="flex items-center gap-3">
            {/* Back to previous page */}
            <button
              onClick={() => navigate(-1)}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
              <Users /> Active Chats
            </h2>
          </div>

          <p className="text-sm text-gray-400 mt-1">
            {connectedUsers.length} users
          </p>
        </div>

        <div className="overflow-y-auto max-h-[60vh] md:max-h-full">
          {connectedUsers.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No active chats</p>
          ) : (
            connectedUsers.map((user) => (
              <div
                key={user.userId}
                onClick={() => selectUser(user)}
                className={`p-4 cursor-pointer hover:bg-purple-900/30 border-b border-purple-500/10 ${
                  selectedUser?.userId === user.userId ? "bg-purple-900/40" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">
                      User {user.userId.slice(-4)}
                    </p>
                    <p className="text-xs text-gray-400">Click to chat</p>
                  </div>
                  {user.hasUnread && (
                    <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-purple-500/20">
              <div className="flex items-center gap-4">
                {/* Back button on mobile */}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="md:hidden text-purple-400"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-white font-semibold">
                  Chat with User {selectedUser.userId.slice(-4)}
                </h2>
              </div>

              <div className="flex gap-3 text-purple-400">
                <Search />
                <MoreVertical />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-md ${
                      msg.sender === "admin"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-700 text-gray-100"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-800 border-t border-purple-500/20 flex gap-3">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full bg-slate-700 text-white outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-purple-600 p-3 rounded-full hover:bg-purple-700"
              >
                <Send className="text-white" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
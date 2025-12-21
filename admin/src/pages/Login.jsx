// // admin/src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5000"; // or use env

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post(`${API_URL}/api/admin/login`, {
//         email,
//         password,
//       });

//       // Store token and user
//       localStorage.setItem("adminToken", res.data.token);
//       localStorage.setItem("admin", JSON.stringify(res.data.admin));

//       navigate("/"); // or your admin dashboard route
//     } catch (err) {
//       setError(err.response?.data?.msg || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Admin Login
//         </h2>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         <form className="space-y-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// // admin/src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5000"; // or use env

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post(`${API_URL}/api/admin/login`, {
//         email,
//         password,
//       });

//       // Success: store token/user if returned
//       localStorage.setItem("adminToken", res.data.token || "");
//       localStorage.setItem("admin", JSON.stringify(res.data.admin));

//       navigate("/"); // or your admin dashboard route
//     } catch (err) {
//       setError(err.response?.data?.msg || "Login failed. Check credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Admin Login
//         </h2>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         <form className="space-y-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import api from "../services/api.js"; // Your axios instance

export default function Login() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await api.post("/admin/login", { email, password });

      // Store admin session
      localStorage.setItem("adminToken", res.data.token || "");
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500); // Redirect to admin dashboard
    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.msg || "Login failed. Invalid credentials.";
      setError(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Navigation - Minimal for Login */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/30" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              SECURECOMM GLOBAL - Admin
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Admin Login
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Secure access for administrators only
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30 shadow-2xl shadow-purple-600/40">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/70 border border-purple-500/40 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    placeholder="admin@gmail.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-slate-900/70 border border-purple-500/40 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-purple-400 hover:text-purple-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "LOGIN"}
              </button>

              {/* Messages */}
              {message && (
                <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded-xl text-center text-green-300">
                  {message}
                </div>
              )}
              {error && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-xl text-center text-red-300">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });

      // Store user data and token
      // localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("token", res.data.token); // matches Account.jsx

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/shop");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      const errMsg =
        err.response?.data?.msg ||
        err.message ||
        "Login failed. Please check your credentials.";
      setError(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            >
              SECURECOMM GLOBAL
            </Link>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex space-x-8">
              <a href="/" className="hover:text-purple-400 transition-colors">
                Home
              </a>
              <a
                href="/#about"
                className="hover:text-purple-400 transition-colors"
              >
                About
              </a>
              <a
                href="/#features"
                className="hover:text-purple-400 transition-colors"
              >
                Features
              </a>
              <a
                href="/#contact"
                className="hover:text-purple-400 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Sign Up Button on Login Page */}
            {isLoginPage && (
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                SIGN UP
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Login Form Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Log in to access your secure communication dashboard
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30 shadow-2xl shadow-purple-600/40">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/70 border border-purple-500/40 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    placeholder="you@securecomm.global"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Password
                </label>
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
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded border-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot Password?
                </a>
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

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

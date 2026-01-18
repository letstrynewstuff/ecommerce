// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, MapPin, Eye, EyeOff } from "lucide-react";
import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Dynamic API URL based on environment
const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

export default function Register() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    // Client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      setError(
        "Please fill in all required fields (Name, Email, Password, Gender).",
      );
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/users/register`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        address: formData.address.trim() || undefined,
        gender: formData.gender,
      });

      // Store token and user if your backend returns them
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      setMessage("Account created successfully! Redirecting to shop...");

      setTimeout(() => {
        navigate("/shop");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      const errMsg =
        err.response?.data?.msg ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed. Please try again.";
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
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            >
              SECURECOMM GLOBAL
            </Link>

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

            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </nav>

      {/* Register Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-lg w-full">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Create Account
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Join SecureComm Global for encrypted communication and secure
              delivery
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30 shadow-2xl shadow-purple-600/40">
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/70 border border-purple-500/40 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/70 border border-purple-500/40 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    placeholder="you@securecomm.global"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Shipping Address (Optional)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/70 border border-purple-500/40 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    placeholder="123 Secure Lane, Defense City"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Gender <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["Male", "Female", "Other"].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center py-3 rounded-xl cursor-pointer transition-all ${
                        formData.gender === option
                          ? "bg-purple-600/70 border border-purple-400"
                          : "bg-slate-900/70 border border-purple-500/40 hover:bg-purple-900/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "SIGN UP"}
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

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

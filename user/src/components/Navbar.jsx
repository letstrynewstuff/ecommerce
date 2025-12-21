// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Main Fixed Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/shop"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            >
              SECURECOMM GLOBAL
            </Link>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/chat" className="group" title="Support Chat">
                <MessageCircle className="w-7 h-7 text-purple-400 group-hover:scale-110 transition" />
              </Link>

              <Link to="/cart" className="relative group" title="Cart">
                <ShoppingCart className="w-7 h-7 text-purple-400 group-hover:scale-110 transition" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <Link to="/account" className="group" title="My Account">
                <User className="w-7 h-7 text-purple-400 group-hover:scale-110 transition" />
              </Link>

              <button onClick={handleLogout} className="group" title="Logout">
                <LogOut className="w-7 h-7 text-purple-400 group-hover:scale-110 group-hover:text-red-400 transition" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-purple-400"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Sharp and Clear */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-slate-900/95 backdrop-blur-xl border-l border-purple-500/30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-purple-300">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="text-purple-400 hover:text-purple-300"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex-1 px-6 py-8 space-y-8">
            <Link
              to="/chat"
              onClick={toggleSidebar}
              className="flex items-center gap-4 text-lg hover:text-purple-400 transition"
            >
              <MessageCircle className="w-6 h-6" />
              Support Chat
            </Link>

            <Link
              to="/cart"
              onClick={toggleSidebar}
              className="flex items-center gap-4 text-lg hover:text-purple-400 transition relative"
            >
              <ShoppingCart className="w-6 h-6" />
              Cart
              {cartItems.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              onClick={toggleSidebar}
              className="flex items-center gap-4 text-lg hover:text-purple-400 transition"
            >
              <User className="w-6 h-6" />
              My Account
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 text-lg hover:text-red-400 transition w-full"
            >
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          </div>

          <div className="p-6 border-t border-purple-500/20 text-center text-sm text-gray-400">
            SecureComm Global © 2025
          </div>
        </div>
      </div>

      {/* Blur Overlay - ONLY on the left side (page content) */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md pointer-events-auto md:hidden"
          style={{ width: "calc(100% - 320px)" }} // Leaves sidebar width unblurred
        />
      )}
    </>
  );
}

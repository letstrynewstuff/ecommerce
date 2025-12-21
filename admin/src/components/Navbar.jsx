import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Box,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleLogout = () => {
    navigate("/login");
    setIsMobileOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  const navLinks = [
    { to: "/", label: "Dashboard", icon: <Home size={20} /> },
    // { to: "/communication", label: "Communication", icon: <Box size={20} /> },
    { to: "/location", label: "Location", icon: <Box size={20} /> },
    // { to: "/phones", label: "Phones", icon: <Box size={20} /> },
    // { to: "/laptops", label: "Laptops", icon: <Box size={20} /> },
    // { to: "/orders", label: "Orders", icon: <ShoppingBag size={20} /> },
    { to: "/users", label: "Users", icon: <Users size={20} /> },
    { to: "/messages", label: "Messages", icon: <Settings size={20} /> },
    // { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out z-50 md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 flex items-center gap-2">
          <img src="/logo.svg" alt="Admin Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Admin</h1>
          <button
            onClick={toggleMobileMenu}
            className="ml-auto md:hidden text-white focus:outline-none"
          >
            <X size={28} />
          </button>
        </div>
        <nav className="px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800"
              onClick={() => setIsMobileOpen(false)} // close menu
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 w-full text-left"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <header className="bg-blue-600 text-white flex items-center justify-between px-4 sm:px-6 py-4 md:sticky top-0 z-30">
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <Menu size={28} />
          </button>
          <span className="text-lg font-semibold">Welcome, Admin</span>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm">{currentDate}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Navbar;

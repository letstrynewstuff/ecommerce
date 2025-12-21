import React from "react";
import {
  Phone,
  Laptop,
  Satellite,
  Radio,
  Network,
  Users,
  Headphones,
  Tv,
} from "lucide-react";

import { ShoppingBag, Shield, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ShoppingCart, MessageCircle, User } from "lucide-react";
import Navbar from "../components/Navbar.jsx";



export default function Shop() {
  const categories = [
    { name: "Phones", icon: <Phone size={48} />, link: "/phones" },
    { name: "Laptops", icon: <Laptop size={48} />, link: "/laptops" },
    { name: "Satellite", icon: <Satellite size={48} />, link: "/satellite" },
    { name: "Radios", icon: <Radio size={48} />, link: "/radios" },
    { name: "Networks", icon: <Network size={48} />, link: "/networks" },
    { name: "Intercom", icon: <Users size={48} />, link: "/intercom" },
    { name: "Headsets", icon: <Headphones size={48} />, link: "/headsets" },
    { name: "Satellite TV", icon: <Tv size={48} />, link: "/satellitetv" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            SECURE SHOP
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Browse military-grade encrypted devices trusted by governments and
          enterprises worldwide.
        </p>
      </section>

      {/* Category Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.link}
              className="group p-10 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/50 transition-all duration-300 text-center"
            >
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-purple-300">{cat.name}</h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
  

}

// pages/Phones.jsx
import React from "react";
import { Shield, Zap, Lock, Globe, ShoppingCart } from "lucide-react";

const products = Array(8).fill(null); // Placeholder for 8 products

export default function Headsets() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      <nav className="fixed top-0 w-full z-50 bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            >
              SECURECOMM GLOBAL
            </a>
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Encrypted Phones
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Military-grade secure smartphones with zero-trace calling
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((_, i) => (
            <div
              key={i}
              className="group bg-linear-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/30 p-6 hover:scale-105 transition-all cursor-pointer"
            >
              <div className="bg-gray-800 border-2 border-dashed border-purple-500/50 rounded-xl w-full h-64 mb-6 flex items-center justify-center">
                <Shield className="w-16 h-16 text-purple-500/50" />
              </div>
              <h3 className="text-xl font-bold text-purple-300">
                SecurePhone X{i + 1}
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                AES-256 | Anti-Intercept | Global Roaming
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-purple-400">
                  $1,299
                </span>
                <button className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 rounded-full text-sm font-semibold hover:scale-110 transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Shield, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import Navbar from "../components/Navbar.jsx";

export default function Phones() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      // 🔍 LOG HERE
      console.log("Products from backend:", data);
      setProducts(data.filter((p) => p.category === "laptops"));
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          // 🔍 LOG HERE (THIS ANSWERS YOUR QUESTION)
          console.log("Image value:", product.image);

          return (
            <div
              key={product._id}
              className="bg-purple-900/20 rounded-2xl border border-purple-500/30 p-6"
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                onError={(e) => {
                  e.target.src = "/fallback.jpg"; // put fallback.jpg in public folder
                }}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-bold text-purple-300">
                {product.name}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {product.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-purple-400">
                  ${product.price}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className="px-6 py-2 bg-purple-600 rounded-full text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

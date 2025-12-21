import React from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cartItems, addToCart, decreaseQty, removeFromCart, total } =
    useCart();

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 px-4">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mb-12 text-purple-400">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="w-20 h-20 mx-auto text-purple-500/40 mb-6" />
          <p className="text-gray-400 text-xl">Your cart is empty</p>
          <Link
            to="/shop"
            className="inline-block mt-6 px-8 py-4 bg-purple-600 rounded-full font-bold hover:scale-105 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-purple-900/20 p-6 rounded-xl border border-purple-500/30"
            >
              <div className="flex items-center gap-6">
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-400">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="p-2 bg-gray-800 rounded-full"
                >
                  <Minus />
                </button>

                <span className="text-xl font-bold">{item.quantity}</span>

                <button
                  onClick={() => addToCart(item)}
                  className="p-2 bg-gray-800 rounded-full"
                >
                  <Plus />
                </button>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-400 hover:text-red-300 ml-4"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-10">
            <p className="text-3xl font-bold mb-6">
              Total: ${total.toLocaleString()}
            </p>
            <Link
              to="/checkout"
              className="px-10 py-4 bg-purple-600 rounded-full font-bold text-lg hover:scale-105 transition inline-block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

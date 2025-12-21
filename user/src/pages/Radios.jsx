// pages/Phones.jsx
import { useEffect, useState } from "react";
import { Shield, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../services/api";

export default function Phones() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const data = await fetchProductsByCategory("radios");
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPhones();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
          >
            SECURECOMM GLOBAL
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
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

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-400 text-xl">
            Loading secure phones...
          </p>
        )}

        {/* PRODUCTS */}
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-linear-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/30 p-6 hover:scale-105 transition-all"
            >
              <div className="bg-gray-800 border-2 border-dashed border-purple-500/50 rounded-xl w-full h-64 mb-6 flex items-center justify-center">
                <Shield className="w-16 h-16 text-purple-500/50" />
              </div>

              <h3 className="text-xl font-bold text-purple-300">
                {product.name}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {product.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-purple-400">
                  ${product.price.toLocaleString()}
                </span>

                <button
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                    })
                  }
                  className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 rounded-full text-sm font-semibold hover:scale-110 transition-all"
                >
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

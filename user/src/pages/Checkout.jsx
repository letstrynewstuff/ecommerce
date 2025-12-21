import { useNavigate } from "react-router-dom";
import { Bitcoin, Landmark, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Checkout() {
  const navigate = useNavigate();
  const { total } = useCart();

  const handlePayment = (method) => {
    // Later: save order to backend with status = "pending"
    navigate("/order-success", {
      state: { method },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white pt-32 px-4">
      <Navbar />
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Secure Checkout
        </h1>

        <p className="mt-6 text-gray-400 text-lg">
          Choose a payment method below. All payments are processed manually.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* BANK TRANSFER */}
          <button
            onClick={() => handlePayment("Bank Transfer (ACH / Wire)")}
            className="p-8 rounded-2xl bg-purple-900/30 border border-purple-500/30 hover:scale-105 transition"
          >
            <Landmark className="w-12 h-12 mx-auto mb-4 text-green-400" />
            <h3 className="text-2xl font-bold">Bank Transfer</h3>
            <p className="text-gray-400 mt-2">ACH or Wire Transfer</p>
          </button>

          {/* CASHAPP */}
          <button
            onClick={() => handlePayment("Cash App")}
            className="p-8 rounded-2xl bg-purple-900/30 border border-purple-500/30 hover:scale-105 transition"
          >
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-2xl font-bold">Cash App</h3>
            <p className="text-gray-400 mt-2">Send payment via Cash App</p>
          </button>

          {/* VENMO */}
          <button
            onClick={() => handlePayment("Venmo")}
            className="p-8 rounded-2xl bg-purple-900/30 border border-purple-500/30 hover:scale-105 transition"
          >
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold">Venmo</h3>
            <p className="text-gray-400 mt-2">Pay using Venmo</p>
          </button>

          {/* CRYPTO */}
          <button
            onClick={() => handlePayment("Bitcoin / Crypto")}
            className="p-8 rounded-2xl bg-purple-900/30 border border-purple-500/30 hover:scale-105 transition"
          >
            <Bitcoin className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold">Crypto (Bitcoin)</h3>
            <p className="text-gray-400 mt-2">
              Pay securely using Bitcoin or supported crypto
            </p>
          </button>
        </div>

        <div className="mt-14 text-xl font-bold text-purple-300">
          Order Total: ${total.toLocaleString()}
        </div>
      </div>
    </div>
  );
}


// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { ShieldCheck, MessageCircle } from "lucide-react";

// export default function OrderSuccess() {
//   const { state } = useLocation();
//   const orderId = state?.orderId || "ORD-XXXXXX";
//   const method = state?.method || "Secure Payment Method";

//   // Pre-written message for the chat
//   const supportMessage = `Hello SecureComm Support,\n\nI just placed order #${orderId} using ${method}.\n\nThe payment is currently pending. Please let me know how to complete the payment for my secure communication equipment.\n\nThank you!`;

//   const openChatWithMessage = () => {
//     // Encode the message and redirect to chat
//     const encodedMessage = encodeURIComponent(supportMessage);
//     window.location.href = `/chat?prefill=${encodedMessage}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex items-center justify-center px-4">
//       <div className="max-w-2xl w-full bg-purple-900/30 border border-purple-500/30 rounded-3xl p-12 text-center shadow-2xl">
//         {/* Success Icon */}
//         <div className="mx-auto w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
//           <ShieldCheck className="w-16 h-16 text-green-400" />
//         </div>

//         <h1 className="text-5xl font-bold mb-6">
//           Order Successfully Created!
//         </h1>

//         <p className="text-xl text-gray-300 mb-4">
//           Order ID: <span className="font-mono text-purple-300">{orderId}</span>
//         </p>

//         <p className="text-lg text-gray-300 mb-8">
//           You selected <strong className="text-purple-300">{method}</strong> as your payment method.
//         </p>

//         <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 mb-10">
//           <h2 className="text-2xl font-semibold mb-4">Payment Pending</h2>
//           <p className="text-gray-300 leading-relaxed">
//             Your order is confirmed and reserved. To complete the purchase of your
//             military-grade secure communication equipment, please contact our support team.
//           </p>
//         </div>

//         {/* Pay Now → Open Chat with Pre-filled Message */}
//         <button
//           onClick={openChatWithMessage}
//           className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
//         >
//           <MessageCircle className="w-8 h-8" />
//           Contact Support to Pay Now
//         </button>

//         <div className="mt-10">
//           <Link
//             to="/shop"
//             className="text-purple-400 hover:text-purple-300 underline transition"
//           >
//             ← Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, MessageCircle } from "lucide-react";

export default function OrderSuccess() {
  const { state } = useLocation();
  const [orderId, setOrderId] = useState("");

  const method = state?.method || "Secure Payment Method";

  // --------------------------
  // Generate random Order ID
  // --------------------------
  // useEffect(() => {
  //   if (!state?.orderId) {
  //     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //     let id = "ORD-";
  //     for (let i = 0; i < 8; i++) {
  //       id += chars.charAt(Math.floor(Math.random() * chars.length));
  //     }
  //     setOrderId(id);
  //   } else {
  //     setOrderId(state.orderId);
  //   }
  // }, [state?.orderId]);
  useEffect(() => {
    if (!state?.orderId && !orderId) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let id = "ORD-";
      for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setOrderId(id);
    } else if (state?.orderId && state.orderId !== orderId) {
      setOrderId(state.orderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-written message for the chat
  const supportMessage = `Hello SecureComm Support,\n\nI just placed order #${orderId} using ${method}.\n\nThe payment is currently pending. Please let me know how to complete the payment for my secure communication equipment.\n\nThank you!`;

  const openChatWithMessage = () => {
    const encodedMessage = encodeURIComponent(supportMessage);
    window.location.href = `/chat?prefill=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-purple-900/30 border border-purple-500/30 rounded-3xl p-12 text-center shadow-2xl">
        <div className="mx-auto w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
          <ShieldCheck className="w-16 h-16 text-green-400" />
        </div>

        <h1 className="text-5xl font-bold mb-6">Order Successfully Created!</h1>

        <p className="text-xl text-gray-300 mb-4">
          Order ID: <span className="font-mono text-purple-300">{orderId}</span>
        </p>

        <p className="text-lg text-gray-300 mb-8">
          You selected <strong className="text-purple-300">{method}</strong> as
          your payment method.
        </p>

        <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Payment Pending</h2>
          <p className="text-gray-300 leading-relaxed">
            Your order is confirmed and reserved. To complete the purchase of
            your military-grade secure communication equipment, please contact
            our support team.
          </p>
        </div>

        <button
          onClick={openChatWithMessage}
          className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
        >
          <MessageCircle className="w-8 h-8" />
          Contact Support to Pay Now
        </button>

        <div className="mt-10">
          <Link
            to="/shop"
            className="text-purple-400 hover:text-purple-300 underline transition"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

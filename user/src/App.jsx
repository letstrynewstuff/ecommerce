// src/AppRoutes.jsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Phones from "./pages/Phones";
import Laptops from "./pages/Laptops";
import Intercom from "./pages/Intercom";
import Satellite from "./pages/Satellite";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Chat from "./pages/chat";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Tracking from "./pages/Tracking";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">
        <div className="text-5xl mb-4">Not Found</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Product out of stock
        </h1>
        <p className="text-gray-500 mb-6">
          The page you’re looking for doesn’t exist or this product is no longer
          available.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Back to Shop
        </button>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  const location = useLocation();

  // Define public routes where Navbar should NOT appear
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Mock authentication state
  // Replace this with your real auth context/logic later
  const isLoggedIn = () => {
    // Example: check for token in localStorage
    return localStorage.getItem("authToken") !== null;
  };

  const showNavbar = isLoggedIn() && !isPublicRoute;

  return (
    <>
      {/* Navbar: Only visible when logged in AND not on public routes */}
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/satellite" element={<Satellite />} />
        <Route path="/intercom" element={<Intercom />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tracking/:trackingCode" element={<Tracking />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

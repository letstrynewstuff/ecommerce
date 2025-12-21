// admin/src/pages/Orders.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { RecentOrders } from "../components/Card"; // Reuse the table

const Orders = () => (
  <div className="ml-64 mt-16 bg-blue-50 min-h-screen p-8">
    <Navbar />
    <h1 className="text-2xl font-bold mb-6">Orders List</h1>
    <RecentOrders /> {/* Extended list would go here */}
  </div>
);

export default Orders;

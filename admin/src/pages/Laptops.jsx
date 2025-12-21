// admin/src/pages/Laptops.jsx
import React from "react";
import Navbar from "../components/Navbar";

const Laptops = () => (
  <div className="ml-64 mt-16 bg-blue-50 min-h-screen p-8">
    <Navbar />
    <h1 className="text-2xl font-bold mb-6">Manage Laptops (3 Slots)</h1>
    {/* Placeholder for 3 laptop slots */}
    <div className="grid grid-cols-1 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold">Laptop Slot {i + 1}</h3>
          <p>Placeholder for laptop details</p>
        </div>
      ))}
    </div>
  </div>
);

export default Laptops;

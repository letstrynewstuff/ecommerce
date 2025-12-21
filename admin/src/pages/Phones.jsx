// admin/src/pages/Phones.jsx
import React from "react";
import Navbar from "../components/Navbar";

const Phones = () => (
  <div className="ml-64 mt-16 bg-blue-50 min-h-screen p-8">
    <Navbar />
    <h1 className="text-2xl font-bold mb-6">Manage Phones (5 Slots)</h1>
    {/* Placeholder for 5 phone slots */}
    <div className="grid grid-cols-1 gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold">Phone Slot {i + 1}</h3>
          <p>Placeholder for phone details</p>
        </div>
      ))}
    </div>
  </div>
);

export default Phones;

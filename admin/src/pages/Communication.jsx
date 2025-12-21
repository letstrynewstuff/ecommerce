// admin/src/pages/Communication.jsx
import React from "react";
import Navbar from "../components/Navbar";

const Communication = () => (
  <div className="ml-64 mt-16 bg-blue-50 min-h-screen p-8">
    <Navbar />
    <h1 className="text-2xl font-bold mb-6">Manage Communication Devices</h1>
    {/* Placeholders for satellite, radios, intercoms */}
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Satellite Devices</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          Placeholder for satellite details
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Radios</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          Placeholder for radios details
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Intercoms</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          Placeholder for intercoms details
        </div>
      </section>
    </div>
  </div>
);

export default Communication;

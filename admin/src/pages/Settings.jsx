// admin/src/pages/Settings.jsx
import React from "react";
import Navbar from "../components/Navbar";

const Settings = () => (
  <div className="ml-64 mt-16 bg-blue-50 min-h-screen p-8">
    <Navbar />
    <h1 className="text-2xl font-bold mb-6">Store Settings</h1>
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Store Name
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="SecureComm Global"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Currency
        </label>
        <select className="w-full p-3 border border-gray-300 rounded-md">
          <option>USD</option>
        </select>
      </div>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold">
        Save Settings
      </button>
    </div>
  </div>
);

export default Settings;

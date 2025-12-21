// // admin/src/pages/Location.jsx
// import React, { useState } from "react";
// import { Plus, Edit, Save, X } from "lucide-react";

// const Location = () => {
//   const [packages, setPackages] = useState([
//     {
//       id: 1,
//       trackingCode: "TRK-ABC123",
//       status: "In Transit",
//       from: "Frankfurt, Germany",
//       to: "Berlin, Germany",
//       currentLocation: "Frankfurt Warehouse",
//       eta: "2025-01-15",
//       createdAt: "2025-01-01",
//     },
//     {
//       id: 2,
//       trackingCode: "TRK-XYZ789",
//       status: "Pending",
//       from: "Warehouse A",
//       to: "Munich, Germany",
//       currentLocation: "Warehouse A",
//       eta: "2025-01-20",
//       createdAt: "2025-01-02",
//     },
//   ]);

//   const [newTrackingCode, setNewTrackingCode] = useState("");
//   const [newFrom, setNewFrom] = useState("");
//   const [newTo, setNewTo] = useState("");
//   const [newCurrentLocation, setNewCurrentLocation] = useState("");
//   const [newETA, setNewETA] = useState("");
//   const [newStatus, setNewStatus] = useState("Pending");

//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     from: "",
//     to: "",
//     currentLocation: "",
//     eta: "",
//     status: "",
//   });

//   const generateTrackingCode = () => {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let code = "TRK-";
//     for (let i = 0; i < 6; i++) {
//       code += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return code;
//   };

//   const handleAddPackage = (e) => {
//     e.preventDefault();
//     if (!newFrom || !newTo || !newCurrentLocation || !newETA)
//       return alert("Please fill all fields");

//     const trackingCode = newTrackingCode || generateTrackingCode();

//     const newPackage = {
//       id: packages.length + 1,
//       trackingCode,
//       status: newStatus,
//       from: newFrom,
//       to: newTo,
//       currentLocation: newCurrentLocation,
//       eta: newETA,
//       createdAt: new Date().toISOString().split("T")[0],
//     };

//     setPackages([...packages, newPackage]);
//     setNewTrackingCode("");
//     setNewFrom("");
//     setNewTo("");
//     setNewCurrentLocation("");
//     setNewETA("");
//     setNewStatus("Pending");
//   };

//   const startEdit = (pkg) => {
//     setEditingId(pkg.id);
//     setEditForm({
//       from: pkg.from,
//       to: pkg.to,
//       currentLocation: pkg.currentLocation,
//       eta: pkg.eta,
//       status: pkg.status,
//     });
//   };

//   const saveEdit = (id) => {
//     setPackages(
//       packages.map((pkg) => (pkg.id === id ? { ...pkg, ...editForm } : pkg))
//     );
//     setEditingId(null);
//   };

//   const cancelEdit = () => setEditingId(null);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-8 text-purple-300">
//         Package Tracking
//       </h1>

//       {/* Add New Package */}
//       <div className="bg-slate-800 p-6 rounded-xl mb-10 border border-purple-500/30">
//         <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
//           <Plus className="w-6 h-6" /> Add New Package
//         </h2>

//         <form onSubmit={handleAddPackage} className="grid md:grid-cols-6 gap-4">
//           <input
//             type="text"
//             placeholder="Tracking Code (optional)"
//             value={newTrackingCode}
//             onChange={(e) => setNewTrackingCode(e.target.value)}
//             className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
//           />
//           <input
//             type="text"
//             placeholder="From"
//             value={newFrom}
//             onChange={(e) => setNewFrom(e.target.value)}
//             className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
//             required
//           />
//           <input
//             type="text"
//             placeholder="To"
//             value={newTo}
//             onChange={(e) => setNewTo(e.target.value)}
//             className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Current Location"
//             value={newCurrentLocation}
//             onChange={(e) => setNewCurrentLocation(e.target.value)}
//             className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
//             required
//           />
//           <input
//             type="date"
//             value={newETA}
//             onChange={(e) => setNewETA(e.target.value)}
//             className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition"
//           >
//             Add Package
//           </button>
//         </form>
//       </div>

//       {/* Package List */}
//       <div className="bg-slate-800 rounded-xl overflow-x-auto border border-purple-500/30">
//         <table className="w-full text-left min-w-[800px]">
//           <thead className="bg-slate-700">
//             <tr>
//               <th className="p-4">Tracking Code</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">From</th>
//               <th className="p-4">To</th>
//               <th className="p-4">Current Location</th>
//               <th className="p-4">ETA</th>
//               <th className="p-4">Created</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {packages.map((pkg) => (
//               <tr key={pkg.id} className="border-t border-purple-500/20">
//                 <td className="p-4 font-mono">{pkg.trackingCode}</td>

//                 <td className="p-4">
//                   {editingId === pkg.id ? (
//                     <select
//                       value={editForm.status}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, status: e.target.value })
//                       }
//                       className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
//                     >
//                       <option>Pending</option>
//                       <option>In Transit</option>
//                       <option>Delivered</option>
//                       <option>On Hold</option>
//                     </select>
//                   ) : (
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         pkg.status === "Pending"
//                           ? "bg-yellow-500/20 text-yellow-300"
//                           : pkg.status === "In Transit"
//                           ? "bg-blue-500/20 text-blue-300"
//                           : pkg.status === "Delivered"
//                           ? "bg-green-500/20 text-green-300"
//                           : "bg-gray-500/20 text-gray-300"
//                       }`}
//                     >
//                       {pkg.status}
//                     </span>
//                   )}
//                 </td>

//                 <td className="p-4">
//                   {editingId === pkg.id ? (
//                     <input
//                       type="text"
//                       value={editForm.from}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, from: e.target.value })
//                       }
//                       className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white w-full"
//                     />
//                   ) : (
//                     pkg.from
//                   )}
//                 </td>

//                 <td className="p-4">
//                   {editingId === pkg.id ? (
//                     <input
//                       type="text"
//                       value={editForm.to}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, to: e.target.value })
//                       }
//                       className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white w-full"
//                     />
//                   ) : (
//                     pkg.to
//                   )}
//                 </td>

//                 <td className="p-4">
//                   {editingId === pkg.id ? (
//                     <input
//                       type="text"
//                       value={editForm.currentLocation}
//                       onChange={(e) =>
//                         setEditForm({
//                           ...editForm,
//                           currentLocation: e.target.value,
//                         })
//                       }
//                       className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white w-full"
//                     />
//                   ) : (
//                     pkg.currentLocation
//                   )}
//                 </td>

//                 <td className="p-4">
//                   {editingId === pkg.id ? (
//                     <input
//                       type="date"
//                       value={editForm.eta}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, eta: e.target.value })
//                       }
//                       className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white w-full"
//                     />
//                   ) : (
//                     pkg.eta
//                   )}
//                 </td>

//                 <td className="p-4">{pkg.createdAt}</td>

//                 <td className="p-4 flex gap-2">
//                   {editingId === pkg.id ? (
//                     <>
//                       <button
//                         onClick={() => saveEdit(pkg.id)}
//                         className="text-green-400 hover:text-green-300"
//                       >
//                         <Save size={20} />
//                       </button>
//                       <button
//                         onClick={cancelEdit}
//                         className="text-red-400 hover:text-red-300"
//                       >
//                         <X size={20} />
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => startEdit(pkg)}
//                       className="text-purple-400 hover:text-purple-300"
//                     >
//                       <Edit size={20} />
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Location;


// admin/src/pages/Location.jsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Save, X } from "lucide-react";
import api from "../services/api"; // Axios instance

const Location = () => {
  // Mock data for reference
  const [packages, setPackages] = useState([
    {
      id: 1,
      trackingCode: "TRK-ABC123",
      status: "In Transit",
      from: "Frankfurt, Germany",
      to: "Berlin, Germany",
      currentLocation: "Frankfurt Warehouse",
      eta: "2025-01-15",
      createdAt: "2025-01-01",
    },
    {
      id: 2,
      trackingCode: "TRK-XYZ789",
      status: "Pending",
      from: "Warehouse A",
      to: "Munich, Germany",
      currentLocation: "Warehouse A",
      eta: "2025-01-20",
      createdAt: "2025-01-02",
    },
  ]);

  const [newTrackingCode, setNewTrackingCode] = useState("");
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [newCurrentLocation, setNewCurrentLocation] = useState("");
  const [newETA, setNewETA] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    from: "",
    to: "",
    currentLocation: "",
    eta: "",
    status: "",
  });

  // Fetch packages from backend (performed inside effect to avoid synchronous setState)
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await api.get("/locations", {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (mounted && res && res.data) {
          setPackages(res.data);
        }
      } catch (err) {
        // axios may throw a CanceledError on abort; ignore aborts
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        console.error("Failed to fetch packages, using mock data.", err);
        // Mock data remains as fallback
      }
    };

    load();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  // Generate random tracking code
  const generateTrackingCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "TRK-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Add new package
  const handleAddPackage = async (e) => {
    e.preventDefault();
    if (!newFrom || !newTo || !newCurrentLocation || !newETA)
      return alert("Please fill all fields");

    const trackingCode = newTrackingCode || generateTrackingCode();

    const newPackage = {
      trackingCode,
      status: newStatus,
      from: newFrom,
      to: newTo,
      currentLocation: newCurrentLocation,
      eta: newETA,
    };

    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.post("/locations", newPackage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPackages([...packages, res.data]);
      // Reset form
      setNewTrackingCode("");
      setNewFrom("");
      setNewTo("");
      setNewCurrentLocation("");
      setNewETA("");
      setNewStatus("Pending");
    } catch (err) {
      console.error("Failed to add package. Using mock update.", err);
      // Fallback for mock
      setPackages([
        ...packages,
        { ...newPackage, id: packages.length + 1, createdAt: new Date().toISOString() },
      ]);
    }
  };

  // Start editing
  const startEdit = (pkg) => {
    setEditingId(pkg.id);
    setEditForm({
      from: pkg.from,
      to: pkg.to,
      currentLocation: pkg.currentLocation,
      eta: pkg.eta,
      status: pkg.status,
    });
  };

  // Save edit
  const saveEdit = async (pkg) => {
    const updatedPackage = { ...pkg, ...editForm };

    try {
      const token = localStorage.getItem("adminToken");
      await api.put(`/locations/${pkg.trackingCode}`, updatedPackage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPackages(
        packages.map((p) => (p.id === pkg.id ? updatedPackage : p))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update package. Using mock update.", err);
      // Fallback to mock update
      setPackages(
        packages.map((p) => (p.id === pkg.id ? updatedPackage : p))
      );
      setEditingId(null);
    }
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-purple-300">
        Package Tracking
      </h1>

      {/* Add New Package */}
      <div className="bg-slate-800 p-6 rounded-xl mb-10 border border-purple-500/30">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6" /> Add New Package
        </h2>

        <form onSubmit={handleAddPackage} className="grid md:grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Tracking Code (optional)"
            value={newTrackingCode}
            onChange={(e) => setNewTrackingCode(e.target.value)}
            className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
          />
          <input
            type="text"
            placeholder="From"
            value={newFrom}
            onChange={(e) => setNewFrom(e.target.value)}
            className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
            required
          />
          <input
            type="text"
            placeholder="To"
            value={newTo}
            onChange={(e) => setNewTo(e.target.value)}
            className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
            required
          />
          <input
            type="text"
            placeholder="Current Location"
            value={newCurrentLocation}
            onChange={(e) => setNewCurrentLocation(e.target.value)}
            className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
            required
          />
          <input
            type="date"
            value={newETA}
            onChange={(e) => setNewETA(e.target.value)}
            className="p-3 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Add Package
          </button>
        </form>
      </div>

      {/* Package List */}
      <div className="bg-slate-800 rounded-xl overflow-x-auto border border-purple-500/30">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-4">Tracking Code</th>
              <th className="p-4">Status</th>
              <th className="p-4">From</th>
              <th className="p-4">To</th>
              <th className="p-4">Current Location</th>
              <th className="p-4">ETA</th>
              <th className="p-4">Created</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-t border-purple-500/20">
                <td className="p-4 font-mono">{pkg.trackingCode}</td>

                <td className="p-4">
                  {editingId === pkg.id ? (
                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white"
                    >
                      <option>Pending</option>
                      <option>In Transit</option>
                      <option>Delivered</option>
                      <option>On Hold</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        pkg.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : pkg.status === "In Transit"
                          ? "bg-blue-500/20 text-blue-300"
                          : pkg.status === "Delivered"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-gray-500/20 text-gray-300"
                      }`}
                    >
                      {pkg.status}
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {editingId === pkg.id ? (
                    <input
                      type="text"
                      value={editForm.from}
                      onChange={(e) =>
                        setEditForm({ ...editForm, from: e.target.value })
                      }
                      className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white w-full"
                    />
                  ) : (
                    pkg.from
                  )}
                </td>

                <td className="p-4">
                  {editingId === pkg.id ? (
                    <input
                      type="text"
                      value={editForm.to}
                      onChange={(e) =>
                        setEditForm({ ...editForm, to: e.target.value })
                      }
                      className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white w-full"
                    />
                  ) : (
                    pkg.to
                  )}
                </td>

                <td className="p-4">
                  {editingId === pkg.id ? (
                    <input
                      type="text"
                      value={editForm.currentLocation}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          currentLocation: e.target.value,
                        })
                      }
                      className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white w-full"
                    />
                  ) : (
                    pkg.currentLocation
                  )}
                </td>

                <td className="p-4">
                  {editingId === pkg.id ? (
                    <input
                      type="date"
                      value={editForm.eta}
                      onChange={(e) =>
                        setEditForm({ ...editForm, eta: e.target.value })
                      }
                      className="p-2 bg-slate-700 border border-purple-500/40 rounded-lg text-white w-full"
                    />
                  ) : (
                    pkg.eta
                  )}
                </td>

                <td className="p-4">{pkg.createdAt}</td>

                <td className="p-4 flex gap-2">
                  {editingId === pkg.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(pkg)}
                        className="text-green-400 hover:text-green-300"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEdit(pkg)}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <Edit size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Location;



// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import api from "../services/api";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch users from backend
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("adminToken");
//       if (!token) {
//         setError("Admin not logged in.");
//         setLoading(false);
//         return;
//       }

//       const res = await api.get("/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch users", err);
//       setError(
//         err.response?.data?.message || "Failed to fetch users from server"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Delete user
//   const deleteUser = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem("adminToken");
//       if (!token) {
//         setError("Admin not logged in.");
//         return;
//       }

//       await api.delete(`/admin/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//     } catch (err) {
//       console.error("Failed to delete user", err);
//       setError(err.response?.data?.message || "Failed to delete user");
//     }
//   };

//   return (
//     <>
      

//       <div className="ml-64 mt-16 bg-blue-50 min-h-screen p-8">
//         <h1 className="text-2xl font-bold mb-6">Users List</h1>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           {loading ? (
//             <p className="text-gray-500">Loading users...</p>
//           ) : error ? (
//             <p className="text-red-600 font-semibold">{error}</p>
//           ) : users.length === 0 ? (
//             <p className="text-gray-500">No users found.</p>
//           ) : (
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="text-left text-gray-500 border-b">
//                   <th className="pb-3">User ID</th>
//                   <th className="pb-3">Email</th>
//                   <th className="pb-3">Role</th>
//                   <th className="pb-3">Created</th>
//                   <th className="pb-3 text-right">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="py-3 text-sm text-gray-600">{user._id}</td>
//                     <td className="py-3 font-medium">{user.email}</td>

//                     <td className="py-3">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           user.role === "admin"
//                             ? "bg-purple-600 text-white"
//                             : "bg-green-500 text-white"
//                         }`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="py-3 text-sm text-gray-500">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="py-3 text-right">
//                       <button
//                         onClick={() => deleteUser(user._id)}
//                         className="text-red-600 hover:text-red-800 font-semibold"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Users;
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Admin not logged in.");
        setLoading(false);
        return;
      }

      const res = await api.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError(
        err.response?.data?.message || "Failed to fetch users from server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Admin not logged in.");
        return;
      }

      await api.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-50">
        <h1 className="text-2xl font-bold mb-6">Users List</h1>

        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : error ? (
            <p className="text-red-600 font-semibold">{error}</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            <table className="min-w-full border-collapse table-auto">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 break-words">User ID</th>
                  <th className="pb-3 break-words">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Created</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 text-sm text-gray-600 break-words">
                      {user._id}
                    </td>
                    <td className="py-3 font-medium break-words">
                      {user.email}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-600 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;

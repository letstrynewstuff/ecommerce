

// import { Routes, Route, Navigate } from "react-router-dom";

// // Pages
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Users from "./pages/Users";
// import Settings from "./pages/Settings";
// import Phones from "./pages/Phones";
// import Laptops from "./pages/Laptops";
// import Location from "./pages/Location";
// import Communication from "./pages/Communication";
// import Messages from "./pages/Messages";

// // Components
// import Navbar from "./components/Navbar";

// export default function App() {

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
//       {/* Navbar contains sidebar and topbar */}
//       <Navbar>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/location" element={<Location />} />
//           <Route path="/messages" element={<Messages />} />
//           <Route path="/phones" element={<Phones />} />
//           <Route path="/laptops" element={<Laptops />} />
//           <Route path="/communication" element={<Communication />} />
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </Navbar>
//     </div>
//   );
// }


import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Phones from "./pages/Phones";
import Laptops from "./pages/Laptops";
import Location from "./pages/Location";
import Communication from "./pages/Communication";
import Messages from "./pages/Messages";

// Components
import Navbar from "./components/Navbar";

export default function App() {
  const adminToken = localStorage.getItem("adminToken");

  return (
    <Routes>
      {/* ✅ PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* 🔒 PROTECTED ADMIN ROUTES */}
      <Route
        path="/*"
        element={
          adminToken ? (
            <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
              <Navbar>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/phones" element={<Phones />} />
                  <Route path="/laptops" element={<Laptops />} />
                  <Route path="/communication" element={<Communication />} />
                </Routes>
              </Navbar>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

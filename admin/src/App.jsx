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

// import Layout from "./components/Layout";

// export default function App() {
//   return (
//     <Routes>
//       {/* Admin login page */}
//       <Route path="/login" element={<Login />} />

//       {/* Pages wrapped by Layout */}
//       <Route element={<Layout />}>
//         {/* Dashboard */}
//         <Route path="/" element={<Dashboard />} />

//         {/* Orders page */}
//         <Route path="orders" element={<Orders />} />

//         {/* Users page */}
//         <Route path="users" element={<Users />} />

//         {/* Settings page */}
//         <Route path="settings" element={<Settings />} />

//         {/* Location */}
//         <Route path="location" element={<Location />} />

//         {/* Messages page */}
//         <Route path="messages" element={<Messages />} />

//         {/* Products pages */}
//         <Route path="phones" element={<Phones />} />
//         <Route path="laptops" element={<Laptops />} />
//         <Route path="communication" element={<Communication />} />
//       </Route>

//       {/* Redirect any unknown route to login */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// }


// // src/App.jsx
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
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
//       <Navbar />

//       <main className="pt-24 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto w-full">
//         <Routes>
//           {/* Admin login page */}
//           <Route path="/login" element={<Login />} />

//           {/* Dashboard */}
//           <Route path="/" element={<Dashboard />} />

//           {/* Orders page */}
//           <Route path="/orders" element={<Orders />} />

//           {/* Users page */}
//           <Route path="/users" element={<Users />} />

//           {/* Settings page */}
//           <Route path="/settings" element={<Settings />} />

//           {/* Location */}
//           <Route path="/location" element={<Location />} />

//           {/* Messages page with mobile back button handled in page itself */}
//           <Route path="/messages" element={<Messages />} />

//           {/* Products pages */}
//           <Route path="/phones" element={<Phones />} />
//           <Route path="/laptops" element={<Laptops />} />
//           <Route path="/communication" element={<Communication />} />

//           {/* Redirect any unknown route to login */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </main>
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
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Navbar contains sidebar and topbar */}
      <Navbar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/location" element={<Location />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Navbar>
    </div>
  );
}

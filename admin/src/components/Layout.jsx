import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 min-h-screen pt-4 md:pt-0 md:ml-64 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;

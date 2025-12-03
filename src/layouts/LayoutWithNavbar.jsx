import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function LayoutWithNavbar() {
  return (
    <div className="app-layout app-layout--with-navbar">
      <Navbar />
      <main className="app-main" aria-live="polite">
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutWithNavbar;

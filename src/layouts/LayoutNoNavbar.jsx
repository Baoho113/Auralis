import React from "react";
import { Outlet } from "react-router-dom";

function LayoutNoNavbar() {
  return (
    <div className="app-layout app-layout--no-navbar">
      <main className="app-main" aria-live="polite">
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutNoNavbar;

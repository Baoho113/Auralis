// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const linkClass = ({ isActive }) =>
  "nav-link" + (isActive ? " nav-link-active" : "");

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <NavLink end to="/" className="brand-link" aria-label="Go to homepage">
            <img
              src="/auralis-logo.png"
              alt="Auralis logo"
              className="brand-logo"
            />
            <span className="brand-text">AURALIS</span>
          </NavLink>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink
            to="/info"
            className={linkClass}
            accessKey="i"
            aria-label="Info page, shortcut Alt plus I"
          >
            Info
          </NavLink>

          <NavLink
            to="/upload"
            className={linkClass}
            accessKey="u"
            aria-label="Upload page, shortcut Alt plus U"
          >
            Upload
          </NavLink>

          <NavLink
            to="/history"
            className={linkClass}
            accessKey="h"
            aria-label="History page, shortcut Alt plus H"
          >
            History
          </NavLink>

          <NavLink
            to="/settings"
            className={linkClass}
            accessKey="s"
            aria-label="Settings page, shortcut Alt plus S"
          >
            Setting
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

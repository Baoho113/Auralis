import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SettingsProvider } from "./context/SettingContext";
import { CookieProvider } from "./context/CookieContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookieProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </CookieProvider>
    </BrowserRouter>
  </React.StrictMode>
);

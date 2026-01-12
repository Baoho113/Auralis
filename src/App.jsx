import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSettings } from "./context/SettingContext";
import { useCookies } from "./context/CookieContext";

import CookieBanner from "./components/CookieBanner";
import CookieSettingsModal from "./components/CookieSettingsModal";

import LayoutNoNavbar from "./layouts/LayoutNoNavbar";
import LayoutWithNavbar from "./layouts/LayoutWithNavbar";

// Accessibility Imports
import AriaAnnouncer from "./components/AriaAnnouncer";
import { useKeyboardShortcuts } from './utils/useKeyboardShortcuts';

import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const { textSize, contrastMode } = useSettings();
  const { showSettings } = useCookies(); 
  
  const { announcement } = useKeyboardShortcuts();
  
  return (
    <div
      className="app"
      data-text-size={textSize}
      data-contrast={contrastMode}
    >
      {/* 2. Braille & Screen Reader Announcer (Hidden visually) */}
      <AriaAnnouncer message={announcement} />

      {/* Cookie UI (global, layout-independent) */}
      <CookieBanner />
      {showSettings && <CookieSettingsModal />}

      {/* App routes */}
      <Routes>
        {/* Routes WITHOUT navbar */}
        <Route element={<LayoutNoNavbar />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Routes WITH navbar */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/info" element={<InfoPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
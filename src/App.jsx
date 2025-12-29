import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSettings } from "./context/SettingContext";

import LayoutNoNavbar from "./layouts/LayoutNoNavbar";
import LayoutWithNavbar from "./layouts/LayoutWithNavbar";

import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import ErrorPage from "./pages/ErrorPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const { textSize } = useSettings();
  const { contrastMode } = useSettings();
  console.log("App textSize:", textSize);

  return (
    <div className="app" data-text-size={textSize} data-contrast={contrastMode}>
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
          <Route path="/error" element={<ErrorPage />} />
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


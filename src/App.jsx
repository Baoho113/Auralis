import { Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import LayoutWithNavbar from "./layouts/LayoutWithNavbar";
import LayoutNoNavbar from "./layouts/LayoutNoNavbar";
import InfoPage from "./pages/InfoPage";

import "./App.css";

function App() {
  return (
    <div className="app">
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

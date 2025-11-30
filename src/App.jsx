import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="app-main" aria-live="polite">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;


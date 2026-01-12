import { useEffect, useState } from "react";
import "./HistoryPage.css";

import {
  loadHistory,
  deleteHistoryItem,
} from "../utils/historyStorage";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load history on page load
  useEffect(() => {
    const storedHistory = loadHistory();
    setHistory(storedHistory);
    setLoading(false);
  }, []);

  const handleDelete = (id) => {
    deleteHistoryItem(id);
    setHistory(loadHistory());
  };

  if (loading) {
    return <p className="history-loading">Loading history...</p>;
  }

  if (history.length === 0) {
    return (
      <section className="history-page">
        <h1 className="history-title">History</h1>
        <p>
          No saved analyses yet. Analyze an image and click
          "Save this analysis" to see it here!
        </p>
      </section>
    );
  }

  return (
    <section className="history-page">
      <h1 className="history-title">History</h1>

      <div className="history-grid">
        {history.map((item) => (
          <article key={item.id} className="history-card">
            <img
              src={item.imageUrl || item.thumbnail}
              alt={item.description || item.prompt}
              className="history-image"
            />

            <p className="history-card-title">
              {(item.description || item.prompt).length > 70
                ? (item.description || item.prompt).substring(0, 70) + "..."
                : item.description || item.prompt}
            </p>

            <p className="history-card-date">
              {item.date
                ? item.date
                : new Date(item.createdAt).toLocaleDateString()}
            </p>

            <div className="history-card-actions">
              <button
                className="btn btn-outline"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HistoryPage;

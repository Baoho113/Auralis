import { useEffect, useState } from "react";
import "./HistoryPage.css";

const API_BASE_URL = "http://localhost:5000";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/history`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Could not load history");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="history-loading">Loading history...</p>;
  }

  if (history.length === 0) {
    return (
      <section className="history-page">
        <h1 className="history-title">History</h1>
        <p>No saved analyses yet. Analyze an image and click "Save this analysis" to see it here!</p>
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
              src={item.thumbnail}
              alt={item.description}
              className="history-image"
            />
            <p className="history-card-title">
              {item.description.length > 70
                ? item.description.substring(0, 70) + "..."
                : item.description}
            </p>
            <p className="history-card-date">{item.date}</p>
            <div className="history-card-actions">
              <button className="btn btn-outline">Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HistoryPage;
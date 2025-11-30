import "./HistoryPage.css";

const mockHistory = [
  { id: 1, title: "A lush, vibrant green tree...", date: "11/5/2024" },
  { id: 2, title: "A girl with blue hair...", date: "6/5/2023" },
  { id: 3, title: "A cat wearing a hat...", date: "25/7/2023" },
  { id: 4, title: "An egg with the rock face...", date: "11/2/2025" },
];

const HistoryPage = () => {
  return (
    <section className="history-page">
      <h1 className="history-title">History</h1>

      <div className="history-grid">
        {mockHistory.map((item) => (
          <article key={item.id} className="history-card">
            <div className="history-image" aria-hidden="true" />
            <p className="history-card-title">{item.title}</p>
            <p className="history-card-date">{item.date}</p>
            <div className="history-card-actions">
              <button className="btn btn-primary">Open</button>
              <button className="btn btn-outline">Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HistoryPage;
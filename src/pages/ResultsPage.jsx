import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveHistoryItem } from "../utils/historyStorage";
import { useCookies } from "../context/CookieContext";
import "./ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cookies } = useCookies();

  const [isSaved, setIsSaved] = useState(false);

  const data = location.state;

  // Safety: direct access / refresh
  if (!data) {
    return (
      <section className="results-page">
        <h1 className="results-title">Results</h1>
        <p>No analysis data found. Please upload an image first.</p>
        <button className="btn btn-primary" onClick={() => navigate("/upload")}>
          Upload an image
        </button>
      </section>
    );
  }

  const { imageSrc, thumbnail, description, tags } = data;

  const handleSave = () => {
    if (isSaved) return;

    if (!cookies.functional) {
      alert("History saving is disabled in cookie settings.");
      return;
    }

    try {
      saveHistoryItem({
        id: crypto.randomUUID(),
        imageUrl: thumbnail, // safe, already generated
        prompt: description || "No description available",
        createdAt: new Date().toISOString(),
      });

      setIsSaved(true);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Could not save analysis.");
    }
  };

  return (
    <section className="results-page">
      <h1 className="results-title">Results</h1>

      <div className="results-layout">
        {/* Image Preview */}
        <section className="results-preview" aria-label="Image preview">
          <h2 className="results-section-title">Image Preview</h2>

          <div className="results-preview-box">
            <img
              src={imageSrc}
              alt="Analyzed image preview"
              className="results-preview-image"
            />
          </div>
        </section>

        {/* Details */}
        <section className="results-details" aria-label="Tags and description">
          <h2 className="results-section-title">Tags &amp; Description</h2>

          {tags?.length > 0 && (
            <div className="results-tags">
              <h3>Tags</h3>
              <div className="results-tag-list">
                {tags.map((tag) => (
                  <span key={tag.name} className="results-tag-pill">
                    {tag.name} ({(tag.confidence * 100).toFixed(1)}%)
                  </span>
                ))}
              </div>
            </div>
          )}

          {description && (
            <div className="results-description">
              <h3>Description</h3>
              <p>{description}</p>
            </div>
          )}
        </section>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button className="btn btn-primary">
          Play Audio
        </button>

        <button
          className="btn btn-outline"
          onClick={() => navigator.clipboard.writeText(description)}
        >
          Copy text
        </button>

        <button
          className="btn btn-outline"
          onClick={handleSave}
          disabled={isSaved}
        >
          {isSaved ? "Saved " : "Save analysis"}
        </button>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/upload")}
        >
          Upload another image
        </button>
      </div>
    </section>
  );
};

export default ResultsPage;

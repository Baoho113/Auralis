import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveHistoryItem } from "../utils/historyStorage";
import { useCookies } from "../context/CookieContext";
import "./ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cookies } = useCookies();
  const [aiDescription, setAiDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleAiGeneration = async (mode) => {
    if (!tags || tags.length === 0) {
      alert("No tags available to generate a description.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("https://auralis-production-9bdb.up.railway.app/api/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: tags,
          type: mode,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setAiDescription(result.description);
      } else {
        throw new Error(result.error || "Failed to generate AI text");
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      alert("Could not generate AI description. Check backend console.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (isSaved) return;

    if (!cookies.functional) {
      alert("History saving is disabled in cookie settings.");
      return;
    }

    try {
      saveHistoryItem({
        id: crypto.randomUUID(),
        imageUrl: thumbnail,
        // Save the AI version if it exists, otherwise use original
        prompt: aiDescription || description || "No description available",
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
        {/* LEFT COLUMN: Image + Actions */}
        <div className="results-left-col">
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

          {/* Moved Actions here so they stay under the image */}
          <div className="results-actions">
            <button className="btn btn-primary">Play Audio</button>
            <button
              className="btn btn-primary"
              onClick={() => navigator.clipboard.writeText(aiDescription || description)}
            >
              Copy text
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaved}
            >
              {isSaved ? "Saved " : "Save analysis"}
            </button>
            <button className="btn btn-primary" onClick={() => navigate("/upload")}>
              Upload another image
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Details (Scrollable) */}
        <section className="results-details" aria-label="Tags and description">
          <h2 className="results-section-title">Analysis & AI</h2>

          <div className="ai-options">
            <h3>Enhance with tags reading AI</h3>
            <p className="ai-hint">Use detected tags to write a better description:</p>
            <div className="ai-button-group">
              <button
                className="btn btn-sm btn-outline-green"
                onClick={() => handleAiGeneration('short')}
                disabled={isGenerating}
              >
                {isGenerating ? "..." : "Generate Short Caption"}
              </button>
              <button
                className="btn btn-sm btn-outline-green"
                onClick={() => handleAiGeneration('long')}
                disabled={isGenerating}
              >
                {isGenerating ? "..." : "Generate Detailed Story"}
              </button>
            </div>
          </div>

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

          <div className="results-description">
            <h3>{aiDescription ? " AI Description" : "Original Description"}</h3>
            <p className={isGenerating ? "generating-text" : ""}>
              {isGenerating ? "AI is thinking..." : (aiDescription || description || "No description available")}
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ResultsPage;

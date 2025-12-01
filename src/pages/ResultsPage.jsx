import "./ResultsPage.css";

const mockTags = ["default data"];

const ResultsPage = () => {
  return (
    <section className="results-page">
      <h1 className="results-title">Results</h1>

      <div className="results-layout">
        <section className="results-preview" aria-label="Image preview">
          <h2 className="results-section-title">Image Preview</h2>
          <div className="results-preview-box">
            <div className="results-preview-placeholder">Function not implement yet</div>
          </div>
        </section>

        <section className="results-details" aria-label="Tags and description">
          <h2 className="results-section-title">Tags &amp; Description</h2>

          <div className="results-tags">
            <h3>Tags</h3>
            <div className="results-tag-list">
              {mockTags.map((tag) => (
                <span key={tag} className="results-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="results-description">
            <h3>Description</h3>
            <p>
              Image description go here after the function is implemented. Long is taking care of this part
            </p>
          </div>
        </section>
      </div>

      <div className="results-actions">
        <button className="btn btn-primary">Play Audio</button>
        <button className="btn btn-outline">Copy text</button>
        <button className="btn btn-primary">Upload another image</button>
      </div>
    </section>
  );
};

export default ResultsPage;
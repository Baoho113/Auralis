import "./errorpage.css";

const ErrorPage = ({ onUploadAnother, onRetry, onBackHome }) => {
  const handleUploadAnother = () => {
    if (onUploadAnother) onUploadAnother();
  };

  const handleRetry = () => {
    if (onRetry) onRetry();
  };

  const handleBackHome = () => {
    if (onBackHome) {
      onBackHome();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="error-page">
      <main className="error-main">
        <section className="error-card">
          <div className="error-icon">⚠️</div>

          <h1 className="error-title">Something went wrong!</h1>
          <p className="error-subtitle">We couldn’t analyze your image.</p>

          <p className="error-description">Possible reasons:</p>
          <ul className="error-list">
            <li>Invalid link</li>
            <li>
              Unsupported file type (only <strong>JPG/PNG</strong>)
            </li>
            <li>
              File too large (max <strong>10MB</strong>)
            </li>
          </ul>

          <div className="error-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUploadAnother}
            >
              Upload another image
            </button>

            <span className="error-or">OR</span>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleRetry}
            >
              Try again
            </button>
          </div>

          <button
            type="button"
            className="error-back-link"
            onClick={handleBackHome}
          >
            Back to Home
          </button>
        </section>
      </main>
    </div>
  );
};

export default ErrorPage;

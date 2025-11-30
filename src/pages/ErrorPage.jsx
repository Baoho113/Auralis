import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="error-icon" aria-hidden="true">
        ⚠️
      </div>
      <h1 className="error-title">Image Analysis Failed!</h1>
      <p className="error-message">
        The image link may be invalid, or the file is unsupported.
      </p>

      <div className="error-actions">
        <button className="btn btn-primary">Upload another image</button>
        <button className="btn btn-outline">Try again</button>
      </div>
    </section>
  );
};

export default ErrorPage;
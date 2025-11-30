import "./HomePage.css";

const HomePage = () => {
  return (
    <section className="home-page">
      <h1 className="home-title">Understand Images. Effortlessly.</h1>
      <p className="home-subtitle">
        Upload an image or paste a URL to receive a clear, AI-generated
        description optimized for screen readers.
      </p>

      <form className="home-upload-form" onSubmit={(e) => e.preventDefault()}>
        <button type="button" className="btn btn-primary">
          Upload an image
        </button>

        <span className="home-upload-or">OR</span>

        <input
          type="url"
          className="home-input-url"
          placeholder="Paste Image URL"
          aria-label="Paste Image URL"
        />

        <button type="submit" className="btn btn-primary">
          Analyze
        </button>
      </form>

      <p className="home-aria-status">ARIA-Live Region: Ready for analysis</p>
    </section>
  );
};

export default HomePage;
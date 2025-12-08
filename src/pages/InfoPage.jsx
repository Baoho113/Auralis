import "./InfoPage.css";

const InfoPage = () => {
  return (
    <main className="info-page" aria-labelledby="info-title">
      {/* Hero / Intro */}
      <section className="info-hero">
        <h1 id="info-title" className="info-title">
          About Auralis
        </h1>
        <p className="info-subtitle">
          Auralis is an image tagging platform designed to help visually
          impaired users understand what&apos;s inside images through rich,
          accessible descriptions.
        </p>
      </section>

      <section className="info-section">
        <h2 className="info-section-title">What Auralis Does</h2>
        <div className="info-grid">
          <article className="info-card">
            <h3 className="info-card-title">Smart Image Tagging</h3>
            <p className="info-card-text">
              Auralis analyzes uploaded images and generates clear tags and
              descriptions that can be read by screen readers or used with
              text-to-speech tools.
            </p>
          </article>

          <article className="info-card">
            <h3 className="info-card-title">Built for Accessibility</h3>
            <p className="info-card-text">
              From contrast options and font sizes to keyboard navigation,
              Auralis is designed so visually impaired users can explore and
              understand image content with confidence.
            </p>
          </article>

          <article className="info-card">
            <h3 className="info-card-title">Continuous Improvement</h3>
            <p className="info-card-text">
              Feedback from users directly informs how we improve our tagging
              accuracy, user interface, and accessibility features.
            </p>
          </article>
        </div>
      </section>

      <section className="info-section">
        <h2 className="info-section-title">Meet the Team</h2>
        <p className="info-body">
          The Auralis team is a small group of developers and designers who care
          deeply about accessibility and inclusive technology. Our goal is to
          make visual content more understandable and usable for everyone,
          regardless of their level of sight.
        </p>

        <div className="info-team-grid" aria-label="Development team">
          <article className="info-card">
            <h3 className="info-card-title">Accessibility First</h3>
            <p className="info-card-text">
              We design and test features with assistive technologies in mind,
              including screen readers and keyboard-only navigation.
            </p>
          </article>
          <article className="info-card">
            <h3 className="info-card-title">User-Centered Design</h3>
            <p className="info-card-text">
              We actively listen to user feedback to understand real needs
              and prioritize features that matter most.
            </p>
          </article>
          <article className="info-card">
            <h3 className="info-card-title">Open to Collaboration</h3>
            <p className="info-card-text">
              We welcome collaboration with accessibility advocates,
              organizations, and users who want to help shape Auralis.
            </p>
          </article>
        </div>
      </section>

      <section className="info-section feedback-section">
        <h2 className="info-section-title">Share Your Feedback</h2>
        <p className="info-body">
          Your feedback helps us build a better experience. Tell us what works
          well, what&apos;s confusing, or what you&apos;d like to see next.
        </p>

        <form className="feedback-form">
          <div className="feedback-row">
            <label htmlFor="feedback-name" className="feedback-label">
              Name (optional)
            </label>
            <input
              id="feedback-name"
              type="text"
              className="feedback-input"
              placeholder="Your name"
            />
          </div>

          <div className="feedback-row">
            <label htmlFor="feedback-email" className="feedback-label">
              Email (optional)
            </label>
            <input
              id="feedback-email"
              type="email"
              className="feedback-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="feedback-row">
            <label htmlFor="feedback-message" className="feedback-label">
              Your feedback
            </label>
            <textarea
              id="feedback-message"
              className="feedback-textarea"
              rows={5}
              placeholder="Tell us about your experience with Auralis..."
              required
            />
          </div>

          <button type="submit" className="feedback-submit">
            Send Feedback
          </button>
        </form>
      </section>
    </main>
  );
};

export default InfoPage;

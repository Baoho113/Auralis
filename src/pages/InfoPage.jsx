import { useState } from "react";
import "./InfoPage.css";

const InfoPage = () => {
  // 1. State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  // 2. State for UI feedback (loading, success, error)
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // This looks for the 'name' attribute
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:5000/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: "Thank you! Your feedback has been sent." });
        setFormData({ name: "", email: "", feedback: "" }); // Clear form
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="info-page" aria-labelledby="info-title">
      {/* Hero / Intro */}
      <section className="info-hero">
        <h1 id="info-title" className="info-title">About Auralis</h1>
        <p className="info-subtitle">
          Auralis is an image tagging platform designed to help visually
          impaired users understand what&apos;s inside images through rich,
          accessible descriptions.
        </p>
      </section>

      {/* What Auralis Does Section */}
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

      {/* Meet the Team Section */}
      <section className="info-section">
        <h2 className="info-section-title">Meet the Team</h2>
        <p className="info-body">
          The Auralis team is a group of 4 RMIT developers and designers. Our goal is to
          make visual content more understandable and usable for everyone,
          regardless of their level of sight. Especially in helping RMIT students with visual impairments to understand images better.
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

      {/* Feedback Form Section */}
      <section className="info-section feedback-section">
        <h2 className="info-section-title">Share Your Feedback</h2>
        <p className="info-body">
          Your feedback helps us build a better experience. Tell us what works
          well, what&apos;s confusing, or what you&apos;d like to see next.
        </p>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="feedback-row">
            <label htmlFor="feedback-name" className="feedback-label">
              Name (optional)
            </label>
            <input
              id="feedback-name"
              name="name"  /* ADDED NAME */
              type="text"
              className="feedback-input"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="feedback-row">
            <label htmlFor="feedback-email" className="feedback-label">
              Gmail Address (required for verification)
            </label>
            <input
              id="feedback-email"
              name="email"
              type="email"
              className="feedback-input"
              placeholder="yourname@gmail.com"
              required /* Changed from optional to required */
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="feedback-row">
            <label htmlFor="feedback-message" className="feedback-label">
              Your feedback
            </label>
            <textarea
              id="feedback-message"
              name="feedback" /* ADDED NAME (MATCHES STATE KEY) */
              className="feedback-textarea"
              rows={5}
              placeholder="Tell us about your experience with Auralis..."
              required
              value={formData.feedback}
              onChange={handleChange}
            />
          </div>

          {/* Success/Error Messages */}
          {status.message && (
            <p className={`feedback-status ${status.type}`} aria-live="polite">
              {status.message}
            </p>
          )}

          <button
            type="submit"
            className="feedback-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default InfoPage;
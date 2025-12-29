import { useState, useEffect } from "react";
import "./SettingsPage.css";
import { useSettings } from "../context/SettingContext";


const SettingsPage = () => {
  // Global settings from context
  const { textSize, setTextSize, contrastMode, setContrastMode } =
    useSettings();

  // Local-only settings
  const [speechSpeed, setSpeechSpeed] = useState("1.0");
  const [language, setLanguage] = useState("en");

  // UI feedback state
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("userSettings");

    if (stored) {
      const parsed = JSON.parse(stored);

      setTextSize(parsed.textSize || "small");
      setContrastMode(parsed.contrastMode || "normal");
      setSpeechSpeed(parsed.speechSpeed || "1.0");
      setLanguage(parsed.language || "en");
    }
  }, [setTextSize, setContrastMode, setSpeechSpeed, setLanguage]);

  // Save settings
  const handleSubmit = (event) => {
    event.preventDefault();

    const settings = {
      textSize,
      contrastMode,
      speechSpeed,
      language,
    };

    localStorage.setItem("userSettings", JSON.stringify(settings));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <section className="settings-page">
      <h1 className="settings-title">Settings</h1>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="settings-row">
          <label className="settings-label">Text Size</label>
          <div
            className="settings-segmented"
            role="radiogroup"
            aria-label="Text size"
          >
            <button
              type="button"
              className={
                "settings-segment" + (textSize === "small" ? " active" : "")
              }
              onClick={() => setTextSize("small")}
              role="radio"
              aria-checked={textSize === "small"}
            >
              Small
            </button>
            <button
              type="button"
              className={
                "settings-segment" + (textSize === "medium" ? " active" : "")
              }
              onClick={() => setTextSize("medium")}
              role="radio"
              aria-checked={textSize === "medium"}
            >
              Medium
            </button>
            <button
              type="button"
              className={
                "settings-segment" + (textSize === "large" ? " active" : "")
              }
              onClick={() => setTextSize("large")}
              role="radio"
              aria-checked={textSize === "large"}
            >
              Large
            </button>
          </div>
        </div>

        <div className="settings-row">
          <label className="settings-label">Contrast Mode</label>
          <div
            className="settings-segmented"
            role="radiogroup"
            aria-label="Contrast mode"
          >
            <button
              type="button"
              className={
                "settings-segment" +
                (contrastMode === "normal" ? " active" : "")
              }
              onClick={() => setContrastMode("normal")}
              role="radio"
              aria-checked={contrastMode === "normal"}
            >
              Normal
            </button>
            <button
              type="button"
              className={
                "settings-segment" +
                (contrastMode === "high" ? " active" : "")
              }
              onClick={() => setContrastMode("high")}
              role="radio"
              aria-checked={contrastMode === "high"}
            >
              High Contrast
            </button>
          </div>
        </div>

        <div className="settings-row">
          <label className="settings-label">Text-to-Speech Speed</label>
          <div
            className="settings-segmented"
            role="radiogroup"
            aria-label="Text to speech speed"
          >
            <button
              type="button"
              className={
                "settings-segment" + (speechSpeed === "0.8" ? " active" : "")
              }
              onClick={() => setSpeechSpeed("0.8")}
              role="radio"
              aria-checked={speechSpeed === "0.8"}
            >
              0.8x
            </button>
            <button
              type="button"
              className={
                "settings-segment" + (speechSpeed === "1.0" ? " active" : "")
              }
              onClick={() => setSpeechSpeed("1.0")}
              role="radio"
              aria-checked={speechSpeed === "1.0"}
            >
              1.0x
            </button>
            <button
              type="button"
              className={
                "settings-segment" + (speechSpeed === "1.2" ? " active" : "")
              }
              onClick={() => setSpeechSpeed("1.2")}
              role="radio"
              aria-checked={speechSpeed === "1.2"}
            >
              1.2x
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="settings-row">
          <label className="settings-label">Language</label>
          <div
            className="settings-segmented"
            role="radiogroup"
            aria-label="Language"
          >
            <button
              type="button"
              className={
                "settings-segment" + (language === "en" ? " active" : "")
              }
              onClick={() => setLanguage("en")}
              role="radio"
              aria-checked={language === "en"}
            >
              English
            </button>
            <button
              type="button"
              className={
                "settings-segment" + (language === "vi" ? " active" : "")
              }
              onClick={() => setLanguage("vi")}
              role="radio"
              aria-checked={language === "vi"}
            >
              Vietnamese
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary settings-save"
          aria-live="polite"
        >
          {saved ? "✓ Saved" : "Save Changes"}
        </button>
      </form>

      <section className="help-page" style={{ marginTop: "2rem" }}>
        <h2 className="help-title">
          Need helps ? - Here are some guides to interact with Auralis
        </h2>

        <div className="help-layout">
          <section>
            <h3 className="help-section-title">Accessibility Features</h3>
            <ol className="help-list">
              <li>Keyboard Navigation</li>
              <li>Screen Reader Support</li>
              <li>Audio Feedback</li>
            </ol>
          </section>

          <section>
            <h3 className="help-section-title">
              Keyboard &amp; Braille Display Shortcuts
            </h3>

            <p className="help-body">
              These shortcuts work on a standard keyboard and on most braille
              displays that send the same keys (for example, the braille command
              for Tab or Enter).
            </p>

            <dl className="help-shortcuts">
              <div className="help-shortcut-row">
                <dt>
                  <span className="kbd">Tab</span>
                </dt>
                <dd>Move to the next button, link, or field.</dd>
              </div>

              <div className="help-shortcut-row">
                <dt>
                  <span className="kbd">Shift</span> +{" "}
                  <span className="kbd">Tab</span>
                </dt>
                <dd>Move to the previous button, link, or field.</dd>
              </div>

              <div className="help-shortcut-row">
                <dt>
                  <span className="kbd">Enter</span> /{" "}
                  <span className="kbd">Space</span>
                </dt>
                <dd>
                  Activate the focused control (press a button, follow a link,
                  etc.).
                </dd>
              </div>

              <div className="help-shortcut-row">
                <dt>
                  <span className="kbd">Ctrl</span> +{" "}
                  <span className="kbd">Alt</span> +{" "}
                  <span className="kbd">H</span>
                </dt>
                <dd>Toggle High Contrast Mode.</dd>
              </div>

              <div className="help-shortcut-row">
                <dt>
                  <span className="kbd">Ctrl</span> +{" "}
                  <span className="kbd">Alt</span> +{" "}
                  <span className="kbd">P</span>
                </dt>
                <dd>Play or pause the image description.</dd>
              </div>
            </dl>

            <p className="help-body help-body-small">
              On a braille keyboard, use the chord that sends each of these keys
              (for example, the braille command for{" "}
              <span className="kbd">Tab</span> or{" "}
              <span className="kbd">Enter</span>). Exact chords can vary
              between braille devices.
            </p>
          </section>
        </div>
      </section>
    </section>
  );
};

export default SettingsPage;

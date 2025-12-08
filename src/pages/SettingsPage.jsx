import "./SettingsPage.css";

const SettingsPage = () => {
  return (
    <section className="settings-page">
      <h1 className="settings-title">Settings</h1>

      <form className="settings-form">
        <div className="settings-row">
          <label className="settings-label">Text Size</label>
          <div className="settings-segmented">
            <button type="button" className="settings-segment active">
              Small
            </button>
            <button type="button" className="settings-segment">
              Medium
            </button>
            <button type="button" className="settings-segment">
              Large
            </button>
          </div>
        </div>

        <div className="settings-row">
          <label className="settings-label">Contrast Mode</label>
          <div className="settings-segmented">
            <button type="button" className="settings-segment active">
              Normal
            </button>
            <button type="button" className="settings-segment">
              High Contrast
            </button>
          </div>
        </div>

        <div className="settings-row">
          <label className="settings-label">Text-to-Speech Speed</label>
          <div className="settings-segmented">
            <button type="button" className="settings-segment">
              0.8x
            </button>
            <button type="button" className="settings-segment active">
              1.0x
            </button>
            <button type="button" className="settings-segment">
              1.2x
            </button>
          </div>
        </div>

        <div className="settings-row">
          <label className="settings-label">Language</label>
          <div className="settings-segmented">
            <button type="button" className="settings-segment active">
              English
            </button>
            <button type="button" className="settings-segment">
              Vietnamese
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary settings-save">
          Save Changes
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
            <h3 className="help-section-title">Keyboard Shortcuts</h3>
            <dl className="help-shortcuts">
              <div>
                <dt>Tab</dt>
                <dd>Navigate forward</dd>
              </div>
              <div>
                <dt>Shift + Tab</dt>
                <dd>Navigate backward</dd>
              </div>
              <div>
                <dt>Enter</dt>
                <dd>Activate button</dd>
              </div>
              <div>
                <dt>Space</dt>
                <dd>Trigger action</dd>
              </div>
              <div>
                <dt>H</dt>
                <dd>Toggle High Contrast Mode</dd>
              </div>
              <div>
                <dt>P</dt>
                <dd>Play Auto Description</dd>
              </div>
            </dl>
          </section>
        </div>
      </section>
    </section>
  );
};

export default SettingsPage;

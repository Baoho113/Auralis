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
    </section>
  );
};

export default SettingsPage;
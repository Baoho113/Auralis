import "./HelpPage.css";

const HelpPage = () => {
  return (
    <section className="help-page">
      <h1 className="help-title">
        Need helps ? - Here are some guides to interact with Auralis
      </h1>

      <div className="help-layout">
        <section>
          <h2 className="help-section-title">Accessibility Features</h2>
          <ol className="help-list">
            <li>Keyboard Navigation</li>
            <li>Screen Reader Support</li>
            <li>Audio Feedback</li>
          </ol>
        </section>

        <section>
          <h2 className="help-section-title">Keyboard Shortcuts</h2>
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
  );
};

export default HelpPage;
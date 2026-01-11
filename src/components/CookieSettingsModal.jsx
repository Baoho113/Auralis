import { useState } from "react";
import { useCookies } from "../context/CookieContext";
import "./CookieSettingsModal.css"; 

const CookieSettingsModal = () => {
  const { cookies, showSettings, setShowSettings, updatePreferences } = useCookies();
  const [prefs, setPrefs] = useState(cookies);

  if (!showSettings) return null;

  const handleSave = () => {
    updatePreferences(prefs);
    setShowSettings(false);
  };

  return (
    <div className="cookie-overlay">
      <div role="dialog" aria-modal="true" className="cookie-modal">
        <div className="cookie-modal-header">
          <h2>Cookie Preferences</h2>
          <p>Choose which cookies you want to allow. Necessary cookies are always enabled.</p>
        </div>

        <div className="cookie-options-list">
          <label className="cookie-option disabled">
            <div className="cookie-text">
              <span className="cookie-name">Necessary cookies</span>
              <span className="cookie-desc">Required for the site to function properly.</span>
            </div>
            <input type="checkbox" checked disabled />
          </label>

          <label className="cookie-option">
            <div className="cookie-text">
              <span className="cookie-name">Analytics cookies</span>
              <span className="cookie-desc">Help us understand how you use our site.</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.analytics}
              onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
            />
          </label>

          <label className="cookie-option">
            <div className="cookie-text">
              <span className="cookie-name">Functional cookies</span>
              <span className="cookie-desc">Enable features like saving your image history.</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.functional}
              onChange={(e) => setPrefs({ ...prefs, functional: e.target.checked })}
            />
          </label>

          <label className="cookie-option">
            <div className="cookie-text">
              <span className="cookie-name">Marketing cookies</span>
              <span className="cookie-desc">Used to deliver personalized advertisements.</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.marketing}
              onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
            />
          </label>
        </div>

        <div className="cookie-modal-actions">
          <button className="btn btn-outline" onClick={() => setShowSettings(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsModal;
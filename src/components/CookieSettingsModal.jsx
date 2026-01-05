import { useState } from "react";
import { useCookies } from "../context/CookieContext";

const CookieSettingsModal = () => {
  const { cookies, showSettings, setShowSettings, updatePreferences } =
    useCookies();

  const [prefs, setPrefs] = useState(cookies);

  if (!showSettings) return null;

  return (
    <div role="dialog" aria-modal="true" className="cookie-modal">
      <h2>Cookie Preferences</h2>

      <label>
        <input type="checkbox" checked disabled />
        Necessary cookies (required)
      </label>

      <label>
        <input
          type="checkbox"
          checked={prefs.analytics}
          onChange={(e) =>
            setPrefs({ ...prefs, analytics: e.target.checked })
          }
        />
        Analytics cookies
      </label>

      <label>
        <input
          type="checkbox"
          checked={prefs.functional}
          onChange={(e) =>
            setPrefs({ ...prefs, functional: e.target.checked })
          }
        />
        Functional cookies
      </label>

      <label>
        <input
          type="checkbox"
          checked={prefs.marketing}
          onChange={(e) =>
            setPrefs({ ...prefs, marketing: e.target.checked })
          }
        />
        Marketing cookies
      </label>

      <button onClick={() => updatePreferences(prefs)}>
        Save preferences
      </button>
      <button onClick={() => setShowSettings(false)}>Cancel</button>
    </div>
  );
};

export default CookieSettingsModal;
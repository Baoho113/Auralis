import { useCookies } from "../context/CookieContext";
import "./CookieBanner.css";

const CookieBanner = () => {
  const { showBanner, acceptAll, rejectAll, setShowSettings } = useCookies();

  if (!showBanner) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <p>
        We use cookies to improve your experience. You can accept all cookies
        or manage your preferences.
      </p>

      <div className="cookie-actions">
        <button onClick={acceptAll}>Accept all</button>
        <button onClick={rejectAll}>Reject non-essential</button>
        <button onClick={() => setShowSettings(true)}>
          Cookie settings
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;

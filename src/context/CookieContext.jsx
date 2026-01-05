import { createContext, useContext, useState, useEffect } from "react";
import {
  getCookiePreferences,
  saveCookiePreferences,
} from "../utils/CookieStorage";

const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const [cookies, setCookies] = useState(getCookiePreferences);
  const [showBanner, setShowBanner] = useState(!cookies.consentGiven);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    saveCookiePreferences(cookies);
  }, [cookies]);

  const acceptAll = () => {
    setCookies({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
      consentGiven: true,
    });
    setShowBanner(false);
  };

  const rejectAll = () => {
    setCookies({
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
      consentGiven: true,
    });
    setShowBanner(false);
  };

  const updatePreferences = (prefs) => {
    setCookies({ ...prefs, consentGiven: true });
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <CookieContext.Provider
      value={{
        cookies,
        showBanner,
        showSettings,
        setShowSettings,
        acceptAll,
        rejectAll,
        updatePreferences,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => useContext(CookieContext);
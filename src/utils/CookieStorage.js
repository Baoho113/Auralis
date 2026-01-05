const COOKIE_KEY = "cookie_preferences";

export const getCookiePreferences = () => {
  const stored = localStorage.getItem(COOKIE_KEY);
  return stored
    ? JSON.parse(stored)
    : {
        necessary: true,
        analytics: false,
        functional: false,
        marketing: false,
        consentGiven: false,
      };
};

export const saveCookiePreferences = (prefs) => {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
};

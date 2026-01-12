import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(() => {
    return localStorage.getItem("textSize") || "medium";
  });

  const [contrastMode, setContrastMode] = useState(() => {
    return localStorage.getItem("contrastMode") || "normal";
  });

  useEffect(() => {
    localStorage.setItem("textSize", textSize);
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem("contrastMode", contrastMode);
  }, [contrastMode]);

  return (
    <SettingsContext.Provider
      value={{
        textSize,
        setTextSize,
        contrastMode,
        setContrastMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
};

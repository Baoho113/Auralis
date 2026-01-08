import { getAnonymousUserId } from "./anonymousUser";

const getHistoryKey = () => {
  const userId = getAnonymousUserId();
  return `auralis_history_${userId}`;
};

// Load history
export const loadHistory = () => {
  return JSON.parse(localStorage.getItem(getHistoryKey())) || [];
};

// Save a new history item with automatic cleanup if storage is full
export const saveHistoryItem = (item) => {
  const MAX_ATTEMPTS = 5; 
  let history = loadHistory();
  history.unshift(item); 

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      localStorage.setItem(getHistoryKey(), JSON.stringify(history));
      return; 
    } catch (err) {
      if (err instanceof DOMException && err.name === "QuotaExceededError") {

        if (history.length === 0) throw err; 
        history.pop(); 
      } else {
        throw err; 
      }
    }
  }

  throw new Error("LocalStorage full: could not save history item.");
};

export const deleteHistoryItem = (id) => {
  const history = loadHistory().filter(item => item.id !== id);
  localStorage.setItem(getHistoryKey(), JSON.stringify(history));
};

export const clearHistory = () => {
  localStorage.removeItem(getHistoryKey());
};

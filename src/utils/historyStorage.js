import { getAnonymousUserId } from "./anonymousUser";

const getHistoryKey = () => {
  const userId = getAnonymousUserId();
  return `auralis_history_${userId}`;
};

// Load history
export const loadHistory = () => {
  return JSON.parse(localStorage.getItem(getHistoryKey())) || [];
};

// Save a new history item
export const saveHistoryItem = (item) => {
  const history = loadHistory();
  history.unshift(item); // newest first
  localStorage.setItem(getHistoryKey(), JSON.stringify(history));
};

// Delete one item
export const deleteHistoryItem = (id) => {
  const history = loadHistory().filter(item => item.id !== id);
  localStorage.setItem(getHistoryKey(), JSON.stringify(history));
};

// Clear all history
export const clearHistory = () => {
  localStorage.removeItem(getHistoryKey());
};

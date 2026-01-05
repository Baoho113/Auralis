const USER_ID_KEY = "auralis_anonymous_user_id";

export const getAnonymousUserId = () => {
  let userId = localStorage.getItem(USER_ID_KEY);

  if (!userId) {
    userId = crypto.randomUUID(); // browser-safe UUID
    localStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
};
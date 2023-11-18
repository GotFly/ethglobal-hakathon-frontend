export const localStorageObj = {
  set: (key: string, providerType: string) => {
    localStorage.setItem(key, providerType);
  },
  get: (key: string) => {
    return localStorage.getItem(key);
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

export function createMiniStorage(api) {
  return Object.defineProperty(
    {
      getItem: (key) => api.getStorageSync(key),
      setItem(key, value) {
        api.setStorageSync(key, value);
      },
      removeItem(key) {
        api.removeStorageSync(key);
      },
      key(index) {
        return api.getStorageInfoSync().keys[index];
      },
      clear() {
        api.clearStorageSync();
      },
    },
    'length',
    {
      get() {
        return api.getStorageInfoSync().keys.length;
      },
    },
  );
}

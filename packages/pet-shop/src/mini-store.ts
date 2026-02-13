export function createMiniStorage(api: any): Storage {
  return Object.freeze({
    getItem: (key: string) => api.getStorageSync(key),
    setItem(key: string, value: any) {
      api.setStorageSync(key, value);
    },
    removeItem(key: string) {
      api.removeStorageSync(key);
    },
    key(index: number) {
      return api.getStorageInfoSync().keys[index];
    },
    clear() {
      api.clearStorageSync();
    },
    get length() {
      return api.getStorageInfoSync().keys.length;
    },
  });
}

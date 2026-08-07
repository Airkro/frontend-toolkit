interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  key(index: number): string | null;
  readonly length: number;
  clear(): void;
}

export function createMiniStorage(api: any): StorageLike {
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

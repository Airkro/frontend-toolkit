/// <reference lib="dom" />
/// <reference types="miniprogram-api-typings" />

export function createMiniStorage(api: WechatMiniprogram.Wx): Storage {
  return Object.freeze({
    getItem: (key: string) => api.getStorageSync<string | null>(key),
    setItem(key: string, value: string) {
      api.setStorageSync(key, value);
    },
    removeItem(key: string) {
      api.removeStorageSync(key);
    },
    key(index: number) {
      return api.getStorageInfoSync().keys[index] ?? null;
    },
    clear() {
      api.clearStorageSync();
    },
    get length() {
      return api.getStorageInfoSync().keys.length;
    },
  });
}

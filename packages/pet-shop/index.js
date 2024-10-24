// @ts-nocheck

function safeParse(string) {
  try {
    return JSON.parse(string);
    // eslint-disable-next-line unicorn/prefer-optional-catch-binding
  } catch (error) {}
}

export function PetShop({ storage, namespace, json = false }) {
  return Object.defineProperties(
    {},
    {
      namespace: {
        value: namespace,
        enumerable: true,
        writable: false,
        configurable: false,
      },
      get: {
        enumerable: true,
        value: json
          ? function get(key) {
              const raw = storage.getItem(`${namespace}.${key}`);

              return raw === null ? undefined : safeParse(raw);
            }
          : function get(key) {
              const raw = storage.getItem(`${namespace}.${key}`);

              return raw === null ? undefined : raw;
            },
      },
      set: {
        enumerable: true,
        value: json
          ? function set(key, value) {
              if (value === undefined) {
                this.remove(key);
              } else {
                storage.setItem(`${namespace}.${key}`, JSON.stringify(value));
              }
            }
          : function set(key, value) {
              if (value === undefined || value === null) {
                this.remove(key);
              } else {
                storage.setItem(`${namespace}.${key}`, value);
              }
            },
      },
      remove: {
        enumerable: true,
        value: function remove(key) {
          storage.removeItem(`${namespace}.${key}`);
        },
      },
      rawKeys: {
        get() {
          const keys = [];

          for (let i = 0; i < storage.length; i += 1) {
            const key = storage.key(i);

            if (key.startsWith(`${namespace}.`)) {
              keys.push(key);
            }
          }

          return keys;
        },
      },
      keys: {
        enumerable: true,
        get() {
          return this.rawKeys.map((key) =>
            key.replace(new RegExp(`^${namespace}.`), ''),
          );
        },
      },
      values: {
        enumerable: true,
        get() {
          return this.keys.map((key) => this.get(key));
        },
      },
      valueOf: {
        enumerable: true,
        value: function valueOf() {
          return this.keys.reduce(
            (io, key) => ({ [key]: this.get(key), ...io }),
            {},
          );
        },
      },
      size: {
        enumerable: true,
        get() {
          return this.rawKeys.length;
        },
      },
      has: {
        enumerable: true,
        value: function has(key) {
          return storage.getItem(`${namespace}.${key}`) !== null;
        },
      },
      clear: {
        enumerable: true,
        value: function clear() {
          this.rawKeys.forEach((key) => {
            storage.removeItem(key);
          });
        },
      },
    },
  );
}

export function createProxy(store) {
  return new Proxy(
    {},
    {
      get(_, key) {
        return store.get(key);
      },
      async set(_, key, value) {
        if (value !== null && value !== undefined) {
          store.set(key, value);
        } else {
          store.remove(key);
        }

        return true;
      },
      async deleteProperty(_, key) {
        store.remove(key);

        return true;
      },
    },
  );
}

export function createCache(storage, keys) {
  return Object.defineProperties(
    {
      clear() {
        storage.clear();
      },
    },
    Object.fromEntries(
      keys.map((key) => [
        key,
        {
          get() {
            return storage.get(key);
          },
          set(value) {
            if (value || value === 0 || value === false) {
              storage.set(key, value);
            } else {
              storage.remove(key);
            }
          },
        },
      ]),
    ),
  );
}

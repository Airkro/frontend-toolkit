// @ts-nocheck

function safeParse(string) {
  try {
    return JSON.parse(string);
  } catch {
    
  }
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
              return raw !== null ? safeParse(raw) : undefined;
            }
          : function get(key) {
              const raw = storage.getItem(`${namespace}.${key}`);
              return raw !== null ? raw : undefined;
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
                if (typeof value !== 'string') {
                  throw new TypeError('The Value should be a string');
                }
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
          // eslint-disable-next-line unicorn/prefer-object-from-entries
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

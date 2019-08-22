'use strict';

module.exports = function PetShop({ storage, namespace }) {
  return Object.defineProperties(
    {},
    {
      namespace: { value: namespace, enumerable: true },
      get: {
        enumerable: true,
        value(key) {
          return storage.getItem(`${namespace}.${key}`) || undefined;
        }
      },
      set: {
        enumerable: true,
        value(key, value) {
          if (value === undefined) {
            this.remove(key);
          } else {
            storage.setItem(`${namespace}.${key}`, value);
          }
        }
      },
      remove: {
        enumerable: true,
        value(key) {
          storage.removeItem(`${namespace}.${key}`);
        }
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
        }
      },
      keys: {
        enumerable: true,
        get() {
          return this.rawKeys.map(key =>
            key.replace(new RegExp(`^${namespace}.`), ''));
        }
      },
      values: {
        enumerable: true,
        get() {
          return this.keys.map(key => this.get(key));
        }
      },
      valueOf: {
        enumerable: true,
        value() {
          return this.keys.reduce(
            (io, key) => ({ [key]: this.get(key), ...io }),
            {}
          );
        }
      },
      stringify: {
        enumerable: true,
        value(replacer, space) {
          return JSON.stringify(this.valueOf(), replacer, space);
        }
      },
      size: {
        enumerable: true,
        get() {
          return this.rawKeys.length;
        }
      },
      has: {
        enumerable: true,
        value(key) {
          return this.get(key) !== undefined;
        }
      },
      clear: {
        enumerable: true,
        value() {
          this.rawKeys.forEach(key => {
            storage.removeItem(key);
          });
        }
      }
    }
  );
};

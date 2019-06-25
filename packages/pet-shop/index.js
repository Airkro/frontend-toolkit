'use strict';

module.exports = function PetShop({ storage, namespace }) {
  return Object.defineProperties(
    {},
    {
      namespace: { value: namespace, enumerable: true },
      get: {
        value(key) {
          return storage.getItem(`${namespace}.${key}`) || undefined;
        }
      },
      set: {
        value(key, value) {
          if (value === undefined) {
            this.remove(key);
          } else {
            storage.setItem(`${namespace}.${key}`, value);
          }
        }
      },
      remove: {
        value(key) {
          storage.removeItem(`${namespace}.${key}`);
        }
      },
      keys: {
        value() {
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
      clear: {
        value() {
          this.keys().forEach(key => {
            storage.removeItem(key);
          });
        }
      }
    }
  );
};

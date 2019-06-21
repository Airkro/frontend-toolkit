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
      }
    }
  );
};

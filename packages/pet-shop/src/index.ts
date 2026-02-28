interface PetShopOptions {
  storage: Storage;
  namespace: string;
  json?: boolean;
}

interface PetShopInstance<T extends Record<string, any> = object> {
  namespace: string;
  get<K extends keyof T>(key: K): T[K] | undefined;
  set<K extends keyof T>(key: K, value: T[K]): void;
  remove(key: keyof T): void;
  readonly rawKeys: string[];
  readonly keys: (keyof T)[];
  readonly values: T[keyof T][];
  valueOf(): T;
  readonly size: number;
  has(key: keyof T): boolean;
  clear(): void;
}

function safeParse<T = any>(string: string): T | undefined {
  try {
    return JSON.parse(string);
  } catch {
    return undefined;
  }
}

export function PetShop<T extends Record<string, any> = object>({
  storage,
  namespace,
  json = false,
}: PetShopOptions): PetShopInstance<T> {
  const store = Object.defineProperties(
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
          ? function get<K extends keyof T>(
              this: PetShopInstance<T>,
              key: K,
            ): T[K] | undefined {
              const raw = storage.getItem(`${namespace}.${String(key)}`);

              return raw === null ? undefined : safeParse<T[K]>(raw);
            }
          : function get<K extends keyof T>(
              this: PetShopInstance<T>,
              key: K,
            ): T[K] | undefined {
              const raw = storage.getItem(`${namespace}.${String(key)}`);

              return raw === null ? undefined : (raw as T[K]);
            },
      },
      set: {
        enumerable: true,
        value: json
          ? function set<K extends keyof T>(
              this: PetShopInstance<T>,
              key: K,
              value: T[K],
            ): void {
              if (value === undefined) {
                this.remove(String(key));
              } else {
                storage.setItem(
                  `${namespace}.${String(key)}`,
                  JSON.stringify(value),
                );
              }
            }
          : function set<K extends keyof T>(
              this: PetShopInstance<T>,
              key: K,
              value: T[K],
            ): void {
              if (value === undefined || value === null) {
                this.remove(String(key));
              } else {
                storage.setItem(`${namespace}.${String(key)}`, value as string);
              }
            },
      },
      remove: {
        enumerable: true,
        value: function remove(key: keyof T): void {
          storage.removeItem(`${namespace}.${String(key)}`);
        },
      },
      rawKeys: {
        get(this: PetShopInstance<T>): string[] {
          const keys: string[] = [];

          for (let i = 0; i < storage.length; i += 1) {
            const key = storage.key(i);

            if (key !== null && key.startsWith(`${namespace}.`)) {
              keys.push(key);
            }
          }

          return keys;
        },
      },
      keys: {
        enumerable: true,
        get(this: PetShopInstance<T>): (keyof T)[] {
          return this.rawKeys.map(
            (key: string): keyof T =>
              key.replace(new RegExp(`^${namespace}.`), '') as keyof T,
          );
        },
      },
      values: {
        enumerable: true,
        get(this: PetShopInstance<T>): T[keyof T][] {
          const result: T[keyof T][] = [];

          for (const key of this.keys) {
            const value = this.get(key);

            if (value !== undefined) {
              result.push(value);
            }
          }

          return result;
        },
      },
      valueOf: {
        enumerable: true,
        value: function valueOf(this: PetShopInstance<T>): T {
          const result = {} as T;

          for (const key of this.keys) {
            const value = this.get(key);

            if (value !== undefined) {
              result[key] = value;
            }
          }

          return result;
        },
      },
      size: {
        enumerable: true,
        get(this: PetShopInstance<T>): number {
          return this.rawKeys.length;
        },
      },
      has: {
        enumerable: true,
        value: function has(key: string): boolean {
          return storage.getItem(`${namespace}.${key}`) !== null;
        },
      },
      clear: {
        enumerable: true,
        value: function clear(this: PetShopInstance<T>): void {
          this.rawKeys.forEach((key: string) => {
            storage.removeItem(key);
          });
        },
      },
    },
  );

  return store as PetShopInstance<T>;
}

export function createProxy<T extends Record<string, any> = object>(
  storage: PetShopInstance<T>,
): T {
  return new Proxy({} as T, {
    get(_target, key: string) {
      return storage.get(key);
    },
    set(_target, key: string, value) {
      if (value !== null && value !== undefined) {
        storage.set(key, value);
      } else {
        storage.remove(key);
      }

      return true;
    },
    deleteProperty(_target, key: string) {
      storage.remove(key);

      return true;
    },
  });
}

type CacheInstance<
  T extends Record<string, any>,
  Keys extends (keyof T)[],
> = Record<Keys[number], T[Keys[number]]> & {
  clear(): void;
};

export function createCache<
  T extends Record<string, any> = object,
  Keys extends (keyof T)[] = (keyof T)[],
>(storage: PetShopInstance<T>, keys: Keys): CacheInstance<T, Keys> {
  return Object.defineProperties(
    {
      clear() {
        storage.clear();
      },
    } as CacheInstance<T, Keys>,
    Object.fromEntries(
      keys.map((key) => {
        return [
          key,
          {
            enumerable: false,
            configurable: true,
            get() {
              return storage.get(key);
            },
            set(value: T[keyof T]) {
              if (value !== undefined && value !== null) {
                storage.set(key, value);
              } else {
                storage.remove(key);
              }
            },
          },
        ];
      }),
    ),
  );
}

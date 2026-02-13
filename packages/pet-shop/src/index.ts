interface PetShopOptions {
  storage: Storage;
  namespace: string;
  json?: boolean;
}

interface PetShopInstance<T extends Record<string, any> = Record<string, any>> {
  namespace: string;
  get<K extends keyof T>(key: K): T[K] | undefined;
  set<K extends keyof T>(key: K, value: T[K]): void;
  remove(key: string): void;
  readonly rawKeys: string[];
  readonly keys: (keyof T)[];
  readonly values: T[keyof T][];
  valueOf(): T;
  readonly size: number;
  has(key: string): boolean;
  clear(): void;
}

function safeParse<T = any>(string: string): T | undefined {
  try {
    return JSON.parse(string);
  } catch {
    return undefined;
  }
}

export function PetShop<T extends Record<string, any> = Record<string, any>>({
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
        value: function remove(key: string): void {
          storage.removeItem(`${namespace}.${key}`);
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
            (key: string) =>
              key.replace(new RegExp(`^${namespace}.`), '') as keyof T,
          );
        },
      },
      values: {
        enumerable: true,
        get(this: PetShopInstance<T>): T[keyof T][] {
          return this.keys.map((key) => this.get(key) as T[keyof T]);
        },
      },
      valueOf: {
        enumerable: true,
        value: function valueOf(this: PetShopInstance<T>): T {
          return this.keys.reduce(
            (io: T, key: keyof T) =>
              ({
                [key]: this.get(key),
                ...io,
              }) as T,
            {} as T,
          );
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

export function createProxy<
  T extends Record<string, any> = Record<string, any>,
>(store: PetShopInstance<T>): T {
  return new Proxy(
    {},
    {
      get(_, key: string) {
        return store.get(key as keyof T);
      },
      set(_, key: string, value: any) {
        if (value !== null && value !== undefined) {
          store.set(key as keyof T, value);
        } else {
          store.remove(key);
        }

        return true;
      },
      deleteProperty(_, key: string) {
        store.remove(key);

        return true;
      },
    },
  ) as T;
}

type CacheInstance<K extends string, V = any> = {
  clear(): void;
} & {
  [T in K]: V;
};

export function createCache<K extends string, V = any>(
  storage: PetShopInstance<any>,
  keys: readonly K[],
): CacheInstance<K, V> {
  const cache = Object.defineProperties(
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
            return storage.get(key as any);
          },
          set(value: V) {
            if (value || value === 0 || value === false) {
              storage.set(key as any, value);
            } else {
              storage.remove(key);
            }
          },
        },
      ]),
    ),
  );

  return cache as CacheInstance<K, V>;
}

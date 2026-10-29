interface PetShopOptions {
  storage: Storage
  namespace: string
  json?: boolean
}

interface PetShopInstance<T extends Record<string, unknown> = object> {
  namespace: string
  get<K extends keyof T>(key: K): T[K] | undefined
  set<K extends keyof T>(key: K, value: T[K]): void
  remove(key: keyof T): void
  readonly rawKeys: string[]
  readonly keys: (keyof T)[]
  readonly values: T[keyof T][]
  valueOf(): T
  readonly size: number
  has(key: keyof T): boolean
  clear(): void
}

type CacheInstance<
  T extends Record<string, unknown>,
  Keys extends (keyof T)[],
> = Pick<T, Keys[number]> & {
  clear(): void
}

interface CacheOptions<T extends Record<string, unknown>> {
  expiresAtKey?: keyof T
}

export { PetShopOptions, PetShopInstance, CacheInstance, CacheOptions }

/// <reference lib="dom" />
/// <reference types="miniprogram-api-typings" />

import { PetShop, createCache } from 'pet-shop/src/index.ts';
import { createMiniStorage } from 'pet-shop/src/mini-store.ts';

// 双向精确类型断言：A 与 B 完全一致
type IsExact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type Expect<T extends true> = T;

// 锁：PetShop() 默认泛型的 keyof 必须是 string
// （曾经是 object，导致 keyof object = never，createCache 报 never）
type DefaultStore = ReturnType<typeof PetShop>;
type DefaultGetKey = Parameters<DefaultStore['get']>[0];
export type lockPetShopDefaultKey = Expect<IsExact<DefaultGetKey, string>>;

// 复刻用户场景：T = Record<string, unknown> 时的缓存值类型为 unknown
type SessionCache = ReturnType<
  typeof createCache<Record<string, unknown>, ['xxxx']>
>;
export type lockCacheValue = Expect<IsExact<SessionCache['xxxx'], unknown>>;

// 锁：具体类型别名 + 其 key 数组，值类型应保留
type User = { token: string; user: string };
type UserCache = ReturnType<typeof createCache<User, ['token', 'user']>>;
export type lockUserToken = Expect<IsExact<UserCache['token'], string>>;
export type lockUserUser = Expect<IsExact<UserCache['user'], string>>;

// 锁：createMiniStorage 入参必须是 WechatMiniprogram.Wx，返回 Storage
type MiniParam = Parameters<typeof createMiniStorage>[0];
type MiniReturn = ReturnType<typeof createMiniStorage>;
export type lockMiniParam = Expect<IsExact<MiniParam, WechatMiniprogram.Wx>>;
export type lockMiniReturn = Expect<IsExact<MiniReturn, Storage>>;

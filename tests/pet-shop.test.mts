import test from 'ava';
import StorageShim from 'node-storage-shim';

import { PetShop, createCache, createProxy } from 'pet-shop/src/index.ts';

test('Base Usage', (t) => {
  const storage = new StorageShim();

  const namespace = 'test-1';

  const store = PetShop<{
    abc: string;
    efg: string;
    hij: string;
  }>({ namespace, storage });

  t.snapshot(store.namespace);

  t.throws(
    () => {
      store.namespace = 'overwrite';
    },
    {
      instanceOf: TypeError,
      message:
        "Cannot assign to read only property 'namespace' of object '#<Object>'",
    },
  );

  t.snapshot(store.get('abc'));

  store.set('efg', '456');
  store.set('hij', '789');
  store.clear();

  const abc = '123';
  store.set('abc', abc);

  t.snapshot(store.get('abc'));
  t.snapshot(storage.getItem(`${namespace}.abc`));

  t.snapshot(store.size);
  t.snapshot(store.has('abc'));
  t.snapshot(store.keys);
  t.snapshot(store.values);
  t.snapshot(store.valueOf());

  store.remove('abc');

  t.snapshot(store.size);
  t.snapshot(store.has('abc'));
  t.snapshot(store.keys);
  t.snapshot(store.values);
  t.snapshot(store.valueOf());
});

test('Json support', (t) => {
  const storage = new StorageShim();

  const namespace = 'test-2';

  const store = PetShop<{
    abc: string;
    efg: string;
    hij: string;
  }>({ namespace, storage, json: true });

  t.snapshot(store.namespace);

  t.throws(
    () => {
      store.namespace = 'overwrite';
    },
    {
      instanceOf: TypeError,
      message:
        "Cannot assign to read only property 'namespace' of object '#<Object>'",
    },
  );

  t.snapshot(store.get('abc'));

  store.set('efg', '456');
  store.set('hij', '789');
  store.clear();

  const abc = 'eeee';
  store.set('abc', abc);

  t.snapshot(store.get('abc'));
  t.snapshot(storage.getItem(`${namespace}.abc`));

  t.snapshot(store.size);
  t.snapshot(store.has('abc'));
  t.snapshot(store.keys);
  t.snapshot(store.values);
  t.snapshot(store.valueOf());

  store.remove('abc');

  t.snapshot(store.size);
  t.snapshot(store.has('abc'));
  t.snapshot(store.keys);
  t.snapshot(store.values);
  t.snapshot(store.valueOf());
});

test('Falsy value', (t) => {
  const storage = new StorageShim();

  const namespace = 'test-3';

  const store = PetShop<{
    abc: string | boolean;
    efg: string;
    hij: string;
  }>({ namespace, storage, json: true });

  t.snapshot(store.namespace);

  t.throws(
    () => {
      store.namespace = 'overwrite';
    },
    {
      instanceOf: TypeError,
      message:
        "Cannot assign to read only property 'namespace' of object '#<Object>'",
    },
  );

  t.snapshot(store.get('abc'));

  store.set('efg', '456');
  store.set('hij', '789');
  store.clear();

  const abc = false;
  store.set('abc', abc);

  t.snapshot(store.get('abc'));
  t.snapshot(storage.getItem(`${namespace}.abc`));

  t.snapshot(store.size);
  t.snapshot(store.has('abc'));
  t.snapshot(store.keys);
  t.snapshot(store.values);
  t.snapshot(store.valueOf());

  store.remove('abc');

  t.snapshot(store.size);
  t.snapshot(store.has('abc'));
  t.snapshot(store.keys);
  t.snapshot(store.values);
  t.snapshot(store.valueOf());
});

test('json error handle', (t) => {
  const storage = new StorageShim();

  const store = PetShop<{
    abc: string;
    efg: string;
    hij: string;
  }>({ namespace: 'error', storage, json: true });

  storage.setItem('error.abc', '[');
  storage.setItem('error.efg', '[]');

  t.snapshot(store.get('abc'));
  t.snapshot(store.get('efg'));
});

test('cache', (t) => {
  const storage = new StorageShim();

  const store = PetShop<{
    abc?: number;
    efg: string;
    hij: boolean;
  }>({ namespace: 'cache', storage, json: true });

  const io = createCache(store, ['abc', 'efg']);

  io.abc = 123;
  io.efg = '456';

  t.snapshot({ ...io }, 'store');
  t.snapshot({ ...storage }, 'storage');

  io.abc = undefined;

  t.snapshot({ ...io }, 'store');

  t.snapshot({ ...storage }, 'storage');
});

test('proxy', (t) => {
  const storage = new StorageShim();

  const store = PetShop<{
    abc?: number;
    efg: string;
    hij: boolean;
  }>({ namespace: 'proxy', storage, json: true });

  const io = createProxy(store);

  io.abc = 123;
  io.efg = '456';
  io.hij = true;

  t.snapshot(io.abc);
  t.snapshot(io.efg);
  t.snapshot(io.hij);

  t.snapshot({ ...io }, 'store');
  t.snapshot({ ...storage }, 'storage');

  delete io.abc;

  t.snapshot(io.abc);
  t.snapshot({ ...io }, 'store');
  t.snapshot({ ...storage }, 'storage');
});

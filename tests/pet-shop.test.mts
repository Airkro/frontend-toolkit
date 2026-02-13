import test from 'ava';
import StorageShim from 'node-storage-shim';

import { PetShop } from 'pet-shop/src/index.ts';

const storage = new StorageShim();

test('Base Usage', (t) => {
  const namespace = 'test-1';

  const store = PetShop({ namespace, storage });

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
  const namespace = 'test-2';

  const store = PetShop({ namespace, storage, json: true });

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

  const abc = [{ xyz: 123 }];
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
  const namespace = 'test-3';

  const store = PetShop({ namespace, storage, json: true });

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
  const store = PetShop({ namespace: 'kkk', storage, json: true });

  storage.setItem('kkk.abc', '[');
  storage.setItem('kkk.efg', '[]');

  t.snapshot(store.get('abc'));
  t.snapshot(store.get('efg'));
});

// @ts-nocheck
import test from 'ava';
import StorageShim from 'node-storage-shim';
import { PetShop } from 'pet-shop';

const storage = new StorageShim();

test('Base Usage', (t) => {
  const namespace = 'test-1';

  const store = PetShop({ namespace, storage });

  t.is(store.namespace, namespace);

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

  t.throws(
    () => {
      store.set('xyz', 123);
    },
    {
      instanceOf: TypeError,
      message: 'The Value should be a string',
    },
  );

  t.is(store.get('abc'), undefined);

  store.set('efg', '456');
  store.set('hij', '789');
  store.clear();

  const abc = '123';
  store.set('abc', abc);

  t.is(store.get('abc'), abc);
  t.is(storage.getItem(`${namespace}.abc`), abc);

  t.is(store.size, 1);
  t.is(store.has('abc'), true);
  t.deepEqual(store.keys, ['abc']);
  t.deepEqual(store.values, [abc]);
  t.deepEqual(store.valueOf(), { abc });

  store.remove('abc');

  t.is(store.size, 0);
  t.is(store.has('abc'), false);
  t.deepEqual(store.keys, []);
  t.deepEqual(store.values, []);
  t.deepEqual(store.valueOf(), {});
});

test('Json support', (t) => {
  const namespace = 'test-2';

  const store = PetShop({ namespace, storage, json: true });

  t.is(store.namespace, namespace);

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

  t.is(store.get('abc'), undefined);

  store.set('efg', '456');
  store.set('hij', '789');
  store.clear();

  const abc = [{ xyz: 123 }];
  store.set('abc', abc);

  t.deepEqual(store.get('abc'), abc);
  t.deepEqual(storage.getItem(`${namespace}.abc`), JSON.stringify(abc));

  t.is(store.size, 1);
  t.is(store.has('abc'), true);
  t.deepEqual(store.keys, ['abc']);
  t.deepEqual(store.values, [abc]);
  t.deepEqual(store.valueOf(), { abc });

  store.remove('abc');

  t.is(store.size, 0);
  t.is(store.has('abc'), false);
  t.deepEqual(store.keys, []);
  t.deepEqual(store.values, []);
  t.deepEqual(store.valueOf(), {});
});

test('Falsy value', (t) => {
  const namespace = 'test-3';

  const store = PetShop({ namespace, storage, json: true });

  t.is(store.namespace, namespace);

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

  t.is(store.get('abc'), undefined);

  store.set('efg', '456');
  store.set('hij', '789');
  store.clear();

  const abc = false;
  store.set('abc', abc);

  t.deepEqual(store.get('abc'), abc);
  t.deepEqual(storage.getItem(`${namespace}.abc`), JSON.stringify(abc));

  t.is(store.size, 1);
  t.is(store.has('abc'), true);
  t.deepEqual(store.keys, ['abc']);
  t.deepEqual(store.values, [abc]);
  t.deepEqual(store.valueOf(), { abc });

  store.remove('abc');

  t.is(store.size, 0);
  t.is(store.has('abc'), false);
  t.deepEqual(store.keys, []);
  t.deepEqual(store.values, []);
  t.deepEqual(store.valueOf(), {});
});

test('json error handle', (t) => {
  const store = PetShop({ namespace: 'kkk', storage, json: true });

  storage.setItem('kkk.abc', '[');
  storage.setItem('kkk.efg', '[]');

  t.is(store.get('abc'), undefined);
  t.deepEqual(store.get('efg'), []);
});

// @ts-nocheck
const test = require('ava');
const PetShop = require('../packages/pet-shop');
const StorageShim = require('node-storage-shim');

const storage = new StorageShim();

test('Base Usage', t => {
  const namespace = 'test';

  const store = PetShop({ namespace, storage });

  t.is(store.namespace, namespace);

  t.is(store.get('abc'), undefined);

  store.set('test', 'test');
  store.clear();

  const abc = '123';
  store.set('abc', abc);

  t.is(store.get('abc'), abc);
  t.is(storage.getItem('test.abc'), abc);

  t.is(store.size, 1);
  t.is(store.has('abc'), true);
  t.deepEqual(store.keys, ['abc']);
  t.deepEqual(store.values, [abc]);
  t.deepEqual(store.valueOf(), { abc });

  t.is(store.stringify(), JSON.stringify({ abc }));

  store.remove('abc');

  t.is(store.size, 0);
  t.is(store.has('abc'), false);
  t.deepEqual(store.keys, []);
  t.deepEqual(store.values, []);
  t.deepEqual(store.valueOf(), {});

  t.is(store.stringify(), '{}');
});

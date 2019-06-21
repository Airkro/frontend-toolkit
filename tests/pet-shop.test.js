// @ts-nocheck
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-require
const PetShop = require('pet-shop');
// eslint-disable-next-line node/no-unpublished-require
const storage = require('localStorage');
const test = require('ava');

test('Base Usage', t => {
  const namespace = 'test';

  const store = PetShop({ namespace, storage });
  t.deepEqual(store.namespace, namespace);

  t.deepEqual(store.get('abc'), undefined);

  const abc = '123';
  store.set('abc', abc);

  t.deepEqual(store.get('abc'), abc);
  t.deepEqual(storage.getItem('test.abc'), abc);

  t.deepEqual(store.size, 1);
  t.deepEqual(store.has('abc'), true);

  t.deepEqual(store.keys, ['abc']);
  t.deepEqual(store.values, [abc]);
  t.deepEqual(store.valueOf(), { abc });
});

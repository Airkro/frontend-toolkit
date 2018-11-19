// @ts-nocheck
// eslint-disable-next-line import/no-extraneous-dependencies
const slash2regexp = require('slash-to-regexp');
const test = require('ava');

test('Initialize example', t => {
  const foo = slash2regexp('node_modules/core-js');
  const bar = slash2regexp('node_modules\\core-js');
  const baz = slash2regexp('/node_modules/core-js/');

  t.deepEqual(foo, /node_modules[\\/]core-js/);
  t.deepEqual(bar, /node_modules[\\/]core-js/);
  t.deepEqual(baz, /[\\/]node_modules[\\/]core-js[\\/]/);
});

// @ts-nocheck

const test = require('ava');

const slash2regexp = require('../packages/slash-to-regexp');

test('Single example', t => {
  const foo = slash2regexp('node_modules/core-js');
  const bar = slash2regexp('node_modules\\core-js');
  const baz = slash2regexp('/node_modules/decimal.js/');

  /* eslint-disable ava/no-incorrect-deep-equal */
  t.deepEqual(foo, /node_modules[\\/]core-js/);
  t.deepEqual(bar, /node_modules[\\/]core-js/);
  t.deepEqual(baz, /[\\/]node_modules[\\/]decimal\.js[\\/]/);
  /* eslint-enable ava/no-incorrect-deep-equal */
});

test('Double example', t => {
  const foo = slash2regexp('node_modules//core-js');
  const bar = slash2regexp('node_modules\\\\core-js');

  /* eslint-disable ava/no-incorrect-deep-equal */
  t.deepEqual(foo, /node_modules[\\/]core-js/);
  t.deepEqual(bar, /node_modules[\\/]core-js/);
  /* eslint-enable ava/no-incorrect-deep-equal */
});

test('Reverse test', t => {
  const string = 'node_modules/decimal.js';

  const regexp = slash2regexp(string);

  // eslint-disable-next-line ava/no-incorrect-deep-equal
  t.deepEqual(regexp, /node_modules[\\/]decimal\.js/);
  t.regex(string, regexp);
});

test('Add Flags', t => {
  const string = 'node_modules/react';

  const regexp = slash2regexp(string, 'g');

  // eslint-disable-next-line ava/no-incorrect-deep-equal
  t.deepEqual(regexp, /node_modules[\\/]react/g);
  t.regex(string, regexp);
});

test('Multiple match', t => {
  const regexp = slash2regexp('node_modules/(react|vue)/');

  // eslint-disable-next-line ava/no-incorrect-deep-equal
  t.deepEqual(regexp, /node_modules[\\/](react|vue)[\\/]/);
});

test('Special characters', t => {
  const foo = slash2regexp('^/node_modules/react-(.)*');

  // eslint-disable-next-line ava/no-incorrect-deep-equal
  t.deepEqual(foo, /^[\\/]node_modules[\\/]react-(.)*/);
});

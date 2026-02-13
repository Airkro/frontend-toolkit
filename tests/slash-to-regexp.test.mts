import test from 'ava';
import slash2regexp from 'slash-to-regexp';

test('Single example', (t) => {
  const foo = slash2regexp('node_modules/core-js');
  const bar = slash2regexp(String.raw`node_modules\core-js`);
  const baz = slash2regexp('/node_modules/decimal.js/');

  t.snapshot(foo);
  t.snapshot(bar);
  t.snapshot(baz);
});

test('Double example', (t) => {
  const foo = slash2regexp('node_modules//core-js');
  const bar = slash2regexp(String.raw`node_modules\\core-js`);

  t.snapshot(foo);
  t.snapshot(bar);
});

test('Reverse test', (t) => {
  const string = 'node_modules/decimal.js';

  const regexp = slash2regexp(string);

  t.snapshot(regexp);
  t.regex(string, regexp);
});

test('Add Flags', (t) => {
  const string = 'node_modules/react';

  const regexp = slash2regexp(string, 'g');

  t.snapshot(regexp);
  t.regex(string, regexp);
});

test('Multiple match', (t) => {
  const regexp = slash2regexp('node_modules/(react|vue)/');

  t.snapshot(regexp);
});

test('Special characters', (t) => {
  const foo = slash2regexp('^/node_modules/react-(.)*');

  t.snapshot(foo);
});

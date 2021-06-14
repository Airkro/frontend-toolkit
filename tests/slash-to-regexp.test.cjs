'use strict';

// @ts-nocheck

const test = require('ava');

const slash2regexp = require('slash-to-regexp');

test('Single example', (t) => {
  const foo = slash2regexp('node_modules/core-js');
  const bar = slash2regexp('node_modules\\core-js');
  const baz = slash2regexp('/node_modules/decimal.js/');

  t.deepEqual(foo, /node_modules[/\\]core-js/);
  t.deepEqual(bar, /node_modules[/\\]core-js/);
  t.deepEqual(baz, /[/\\]node_modules[/\\]decimal\.js[/\\]/);
});

test('Double example', (t) => {
  const foo = slash2regexp('node_modules//core-js');
  const bar = slash2regexp('node_modules\\\\core-js');

  t.deepEqual(foo, /node_modules[/\\]core-js/);
  t.deepEqual(bar, /node_modules[/\\]core-js/);
});

test('Reverse test', (t) => {
  const string = 'node_modules/decimal.js';

  const regexp = slash2regexp(string);

  t.deepEqual(regexp, /node_modules[/\\]decimal\.js/);
  t.regex(string, regexp);
});

test('Add Flags', (t) => {
  const string = 'node_modules/react';

  const regexp = slash2regexp(string, 'g');

  t.deepEqual(regexp, /node_modules[/\\]react/g);
  t.regex(string, regexp);
});

test('Multiple match', (t) => {
  const regexp = slash2regexp('node_modules/(react|vue)/');

  t.deepEqual(regexp, /node_modules[/\\](react|vue)[/\\]/);
});

test('Special characters', (t) => {
  const foo = slash2regexp('^/node_modules/react-(.)*');

  t.deepEqual(foo, /^[/\\]node_modules[/\\]react-(.)*/);
});

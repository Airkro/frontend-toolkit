// @ts-nocheck

/* eslint-disable ava/no-incorrect-deep-equal */

const test = require('ava');

const ext2regexp = require('../packages/ext-to-regexp');

test('Initialize', t => {
  const html = ext2regexp({
    extname: ['html']
  });

  t.deepEqual(html.valueOf(), /\.html$/);
  t.deepEqual(html.extname, ['html']);
  t.deepEqual(html.suffix, []);

  const jsx = ext2regexp({
    extname: ['js', 'jsx']
  });

  t.deepEqual(jsx.valueOf(), /\.(js|jsx)$/);
  t.deepEqual(jsx.extname, ['js', 'jsx'].sort());
  t.deepEqual(jsx.suffix, []);

  const file = ext2regexp({
    extname: ['toml', 'yaml', 'json']
  });

  t.deepEqual(file.valueOf(), /\.(json|toml|yaml)$/);
  t.deepEqual(file.extname, ['toml', 'yaml', 'json'].sort());
  t.deepEqual(file.suffix, []);
});

test('Immutable add', t => {
  const css = ext2regexp({
    extname: ['css']
  });

  const style = css.add('scss', 'sass').add('less');

  t.deepEqual(style.valueOf(), /\.(css|less|sass|scss)$/);
  t.deepEqual(css.valueOf(), /\.css$/);
});

test('Immutable remove', t => {
  const style = ext2regexp({
    extname: ['css', 'scss', 'sass', 'less']
  });

  const css = style.remove('less').remove('scss', 'sass');

  t.deepEqual(css.valueOf(), /\.css$/);
  t.deepEqual(style.valueOf(), /\.(css|less|sass|scss)$/);
});

test('Suffix support', t => {
  const style = ext2regexp({
    suffix: ['module'],
    extname: ['css', 'scss', 'sass', 'less']
  });

  t.deepEqual(style.valueOf(), /\.module\.(css|less|sass|scss)$/);

  const script = ext2regexp({
    suffix: ['min'],
    extname: ['js', 'cjs', 'mjs']
  });

  t.deepEqual(script.valueOf(), /\.min\.(cjs|js|mjs)$/);

  const image = ext2regexp({
    suffix: ['min', 'hash'],
    extname: ['jpg', 'png', 'jpeg']
  });

  t.deepEqual(image.valueOf(), /\.min\.hash\.(jpeg|jpg|png)$/);
});

test('Regexp matching', t => {
  const json = ext2regexp({
    extname: ['json']
  });

  t.regex('test.json', json);
  t.notRegex('test.json5', json);

  const html = ext2regexp({
    extname: ['htm', 'html']
  });

  t.regex('index.html', html);
  t.notRegex('index.hbs', html);

  const script = ext2regexp({
    suffix: ['min'],
    extname: ['js']
  });

  t.regex('abc.min.js', script);
  t.notRegex('abc.js', script);

  const image = ext2regexp({
    suffix: ['min', 'hash'],
    extname: ['jpg', 'png', 'jpeg']
  });

  t.regex('abc.min.hash.jpg', image);
  t.notRegex('abc.jpg', image);
});

test('Error handle', t => {
  t.throws(() => ext2regexp(), {
    instanceOf: TypeError,
    message: "Parameter `extname` shouldn't be empty"
  });

  t.throws(() => ext2regexp({}), {
    instanceOf: TypeError,
    message: "Parameter `extname` shouldn't be empty"
  });

  t.throws(() => ext2regexp({ extname: {} }), {
    instanceOf: TypeError,
    message: 'Parameter `extname` should be an array'
  });

  t.throws(() => ext2regexp({ extname: [null] }), {
    instanceOf: TypeError,
    message: 'Parameter null is not valid'
  });

  t.throws(() => ext2regexp({ suffix: [''] }), {
    instanceOf: TypeError,
    message: 'Parameter "" is not valid'
  });
});

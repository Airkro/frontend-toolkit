// @ts-nocheck
// eslint-disable-next-line import/no-extraneous-dependencies
const ext2regexp = require('ext-to-regexp');
const test = require('ava');

test('Initialize example', t => {
  const html = ext2regexp('html');
  const jsx = ext2regexp('js', 'jsx');
  const file = ext2regexp('toml', 'yaml', 'json');

  t.deepEqual(html, /\.html$/);
  t.deepEqual(jsx, /\.(js|jsx)$/);
  t.deepEqual(file, /\.(json|toml|yaml)$/);

  t.deepEqual(html.extname, ['html'].sort());
  t.deepEqual(jsx.extname, ['js', 'jsx'].sort());
  t.deepEqual(file.extname, ['toml', 'yaml', 'json'].sort());
});

test('Method add (immutable)', t => {
  const css = ext2regexp('css');
  const style = css.add('scss', 'sass').add('less');

  t.deepEqual(style, /\.(css|less|sass|scss)$/);
  t.deepEqual(css, /\.css$/);
});

test('Method remove (immutable)', t => {
  const style = ext2regexp('css', 'scss', 'sass', 'less');
  const css = style.remove('less').remove('scss', 'sass');

  t.deepEqual(css, /\.css$/);
  t.deepEqual(style, /\.(css|less|sass|scss)$/);
});

test('Usage: regexp matching', t => {
  const json = ext2regexp('json');
  const html = ext2regexp('htm', 'html');

  t.regex('index.html', html);
  t.notRegex('index.hbs', html);
  t.regex('test.json', json);
  t.notRegex('test.json5', json);
});

test('Error handle: throws', t => {
  t.throws(() => ext2regexp(), {
    instanceOf: TypeError,
    message: 'Parameter is required'
  });
  t.throws(() => ext2regexp([]), {
    instanceOf: TypeError,
    message: 'Parameter [] is not valid'
  });
  t.throws(() => ext2regexp('css', ''), {
    instanceOf: TypeError,
    message: 'Parameter "" is not valid'
  });
});

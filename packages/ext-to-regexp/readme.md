# ext-to-regexp

Convert extname into regexp.

[npm-url]: https://www.npmjs.com/package/ext-to-regexp
[npm-badge]: https://img.shields.io/npm/v/ext-to-regexp.svg?style=flat-square&logo=npm
[github-url]: https://github.com/Airkro/regexp-toolset/tree/master/packages/ext-to-regexp
[node-badge]: https://img.shields.io/node/v/ext-to-regexp.svg?style=flat-square&colorB=green&logo=node.js
[license-badge]: https://img.shields.io/npm/l/ext-to-regexp.svg?style=flat-square&colorB=blue&logo=github

[![npm][npm-badge]][npm-url]
[![license][license-badge]][github-url]
![node][node-badge]

## Installation

```bash
npm install ext-to-regexp
```

## Usage

```js
const extToRegexp = require('ext-to-regexp');

const regex = extToRegexp('js', 'jsx');
console.log(regex); // output /\.(js|jsx)$/

const foo = extToRegexp('css');
const bar = foo.add('sass', 'scss').add('less');
const baz = bar.remove('sass').remove('scss');

console.log(foo); // output /\.css$/
console.log(bar); // output /\.(css|less|sass|scss)$/
console.log(baz); // output /\.(css|less)$/
```

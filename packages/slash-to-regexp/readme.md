# slash-to-regexp

Convert path with slash into regexp.

[npm-url]: https://www.npmjs.com/package/slash-to-regexp
[npm-badge]: https://img.shields.io/npm/v/slash-to-regexp.svg?style=flat-square&logo=npm
[github-url]: https://github.com/Airkro/regexp-toolset/tree/master/packages/slash-to-regexp
[node-badge]: https://img.shields.io/node/v/slash-to-regexp.svg?style=flat-square&colorB=green&logo=node.js
[license-badge]: https://img.shields.io/npm/l/slash-to-regexp.svg?style=flat-square&colorB=blue&logo=github

[![npm][npm-badge]][npm-url]
[![license][license-badge]][github-url]
![node][node-badge]

## Installation

```bash
npm install slash-to-regexp
```

## Usage

```js
const slashToRegexp = require('slash-to-regexp');

const foo = slashToRegexp('node_modules/core-js');
console.log(foo); // output /node_modules[\\/]core-js/

const bar = slashToRegexp('node_modules\\core-js');
console.log(bar); // output /node_modules[\\/]core-js/
```

# pet-shop

A simple wrapper of Web Storage API.

[npm-url]: https://www.npmjs.com/package/pet-shop
[npm-badge]: https://img.shields.io/npm/v/pet-shop.svg?style=flat-square&logo=npm
[github-url]: https://github.com/Airkro/regexp-toolset/tree/master/packages/pet-shop
[node-badge]: https://img.shields.io/node/v/pet-shop.svg?style=flat-square&colorB=green&logo=node.js
[license-badge]: https://img.shields.io/npm/l/pet-shop.svg?style=flat-square&colorB=blue&logo=github

[![npm][npm-badge]][npm-url]
[![license][license-badge]][github-url]
![node][node-badge]

## Installation

```bash
npm install pet-shop
```

Usage

```js
// plain-text store
const store = PetShop({
  namespace: 'pet-shop',
  storage: localStorage
});

store.set('abc', 'xyz');
store.get('abc'); // output: 'xyz'
store.size; // output: 1
localStorage.getItem('pet-shop.abc'); // output: 'xyz'

store.remove('abc');

store.has('abc'); // output: false
```

```js
// json store
const store = PetShop({
  namespace: 'pet-shop',
  storage: localStorage,
  json: true
});

store.set('abc', ['xyz']);
store.get('abc'); // output: ['xyz']
store.size; // output: 1
localStorage.getItem('pet-shop.abc'); // output: ['xyz']

store.remove('abc');

store.has('abc'); // output: false
```

'use strict';

module.exports = function slashToRegexp(path, flags) {
  if (typeof path !== 'string') {
    throw new TypeError('Expected a string');
  }

  const replacer1 = ',,,,,,,,,,,,,,,,';
  const replacer2 = '~~~~~~~~~~~~~~~~';

  return new RegExp(
    path
      .replace(/\(\.\)/g, replacer1)
      .replace(/\./g, replacer2)
      .replace(/(?<![\\/])([\\/]{1,2})(?![\\/])/g, '[\\\\/]')
      .replace(new RegExp(replacer1, 'g'), '(.)')
      .replace(new RegExp(replacer2, 'g'), '\\.'),
    flags
  );
};

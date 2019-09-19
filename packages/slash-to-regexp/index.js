'use strict';

const regex = /[|{}()[\]^$+*?.]/g;

module.exports = function slashToRegexp(path, flags) {
  if (typeof path !== 'string') {
    throw new TypeError('Expected a string');
  }

  const replacer = ',,,,,,,,,,,,,,,,';

  return new RegExp(
    path
      .replace(/\\{1,2}|\/{1,2}/g, replacer)
      .replace(regex, '\\$&')
      .replace(new RegExp(replacer, 'g'), '[\\\\/]'),
    flags
  );
};

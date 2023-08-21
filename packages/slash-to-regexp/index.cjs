'use strict';

module.exports = function slashToRegexp(path, flags) {
  if (typeof path !== 'string') {
    throw new TypeError('Expected a string');
  }

  const replacer1 = ',,,,,,,,,,,,,,,,';
  const replacer2 = '~~~~~~~~~~~~~~~~';

  return new RegExp(
    path
      .replaceAll('(.)', replacer1)
      .replaceAll('.', replacer2)
      .replaceAll(/(?<![/\\])([/\\]{1,2})(?![/\\])/g, '[/\\\\]')
      .replaceAll(new RegExp(replacer1, 'g'), '(.)')
      .replaceAll(new RegExp(replacer2, 'g'), '\\.'),
    flags,
  );
};

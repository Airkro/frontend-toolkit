'use strict';

function subtract(set, array) {
  return set.filter(item => !array.includes(item));
}

function makeRegexp(suffixes, extname) {
  const suffix = suffixes.length > 0 ? ['', ...suffixes].join('\\.') : '';
  const mode = extname.length === 1 ? extname[0] : `(${extname.join('|')})`;
  return new RegExp(`${suffix}\\.${mode}$`);
}

function childTypeCheck(parameters) {
  if (parameters.length > 0) {
    parameters.forEach(parameter => {
      if (typeof parameter !== 'string' || parameter === '') {
        throw new TypeError(
          `Parameter ${JSON.stringify(parameter)} is not valid`
        );
      }
    });
  }
}

function arrayTypeCheck(parameters, name, length = false) {
  if (!Array.isArray(parameters)) {
    throw new TypeError(`Parameter \`${name}\` should be an array`);
  }

  if (length && parameters.length === 0) {
    throw new TypeError(`Parameter \`${name}\` shouldn't be empty`);
  }

  childTypeCheck(parameters);
}

module.exports = {
  makeRegexp,
  subtract,
  arrayTypeCheck
};

function uniqueness(array) {
  return [...new Set(array)].sort();
}

function subtract(set, array) {
  return set.filter(item => !array.includes(item));
}

function makeRegexp(suffix, extname) {
  if (typeof suffix !== 'string') {
    throw new TypeError('Suffix has to be a string');
  }
  const mode = extname.length === 1 ? extname[0] : `(${extname.join('|')})`;
  return new RegExp(`${suffix}\\.${mode}$`);
}

function typeCheck(parameters) {
  if (parameters.length === 0) {
    throw new TypeError('Parameter is required');
  }
  parameters.forEach(ext => {
    if (typeof ext !== 'string' || ext === '') {
      throw new TypeError(`Parameter ${JSON.stringify(ext)} is not valid`);
    }
  });
}

module.exports = {
  makeRegexp,
  subtract,
  typeCheck,
  uniqueness
};

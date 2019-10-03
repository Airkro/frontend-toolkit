'use strict';

const { subtract, makeRegexp, arrayTypeCheck } = require('./lib');

module.exports = function extToRegexp({ suffix = [], extname = [] } = {}) {
  arrayTypeCheck(suffix, 'suffix');
  arrayTypeCheck(extname, 'extname', true);

  extname.sort();

  return Object.defineProperties(makeRegexp(suffix, extname), {
    suffix: {
      enumerable: true,
      value: Object.freeze(suffix)
    },
    extname: {
      enumerable: true,
      value: Object.freeze(extname)
    },
    valueOf: {
      value() {
        return new RegExp(this.source, this.flags);
      }
    },
    add: {
      enumerable: true,
      value(...ext) {
        arrayTypeCheck(ext, 'extname', true);

        return extToRegexp({
          suffix,
          extname: [...extname, ...ext]
        });
      }
    },
    remove: {
      enumerable: true,
      value(...ext) {
        arrayTypeCheck(ext, 'extname', true);

        return extToRegexp({
          suffix,
          extname: subtract(extname, ext)
        });
      }
    }
  });
};

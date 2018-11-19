const {
  uniqueness, subtract, makeRegexp, typeCheck
} = require('./lib');

module.exports = function extToRegexp(...input) {
  typeCheck(input);

  const extname = uniqueness(input);
  const regexp = makeRegexp('', extname);

  return Object.freeze(
    Object.defineProperties(regexp, {
      extname: {
        value: Object.freeze(extname)
      },
      add: {
        value(...ext) {
          return extToRegexp(...extname, ...ext);
        }
      },
      ...(extname.length > 1
        ? {
          remove: {
            value(...ext) {
              return extToRegexp(...subtract(extname, ext));
            }
          }
        }
        : undefined)
    })
  );
};

'use strict';

module.exports = function slashToRegexp(path) {
  return new RegExp(
    path.replace(/(\\|\/){1,2}/g, '[\\\\/]').replace(/\./g, '\\.')
  );
};

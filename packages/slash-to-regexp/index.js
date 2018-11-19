module.exports = function slashToRegexp(path) {
  return new RegExp(path.replace(/\\|\//g, '[\\\\/]'));
};

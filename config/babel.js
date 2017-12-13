/*
 * `babel` module
 * ==============
 *
 * Basic Babel presets configuration.
 */

module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: 'last 2 versions'
      },
      useBuiltIns: 'usage'
    }]
  ]
};

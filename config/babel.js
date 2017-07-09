/*
 * `babel` module
 * ==============
 *
 * Basic Babel presets configuration.
 */

module.exports = {
  presets: [
    ['env', {
      targets: {
        browsers: 'last 2 versions'
      },
      useBuiltIns: true
    }]
  ]
};

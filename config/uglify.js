/*
 * `uglify` module
 * ===============
 *
 * UglifyJs plugin settings.
 */

module.exports = {
  output: {
    comments: false
  },
  compress: {
    unused: true,
    warnings: false,
    comparisons: true,
    conditionals: true,
    negate_iife: false,
    dead_code: true,
    if_return: true,
    join_vars: true,
    evaluate: true
  }
};

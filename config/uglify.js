/*
 * `uglify` module
 * ===============
 *
 * UglifyJs plugin settings.
 */

/* eslint-disable camelcase */
module.exports = {
  output: {
    comments: false
  },
  compress: {
    comparisons: true,
    conditionals: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true,
    negate_iife: false,
    unused: true,
    warnings: false
  }
};

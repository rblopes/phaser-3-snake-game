/*
 * UglifyJS Webpack plugin settings
 * ================================
 *
 * For an complete reference on tweaks and compression options, check the
 * UglifyJS plugin page.
 *
 * - <https://github.com/webpack-contrib/uglifyjs-webpack-plugin>
 */

module.exports = {
  //  Enable cache, so subsequent runs will be faster.
  cache: true,

  //  Up to 4 parallel jobs.
  parallel: 4,

  //  Output a source map after compression finished.
  sourceMap: true
};

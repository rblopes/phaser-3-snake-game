/*
 *  Webpack Rules
 *  =============
 *
 *  How sources are processed by Webpack.
 */

import {dirs} from '../paths';

export default [
  //  ESLint
  //  ------
  //
  //  Run ESLint over application modules to detect issues. Issues are
  //  reported in the terminal.
  //
  //  Reference:
  //  - <https://github.com/webpack-contrib/eslint-loader#readme>
  {
    test: /\.js$/,
    include: dirs.scripts,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      emitError: true,
      emitWarning: true
    }
  }
];

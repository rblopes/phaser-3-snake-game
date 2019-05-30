/*
 *  Webpack Rules
 *  =============
 *
 *  How sources are processed by Webpack.
 */

import {dirs} from '../paths';

export default [
  //  JavaScript Application Modules
  //  ------------------------------
  //
  //  Compile application modules with Babel 7. Uses `@babel/preset-env` to
  //  compatibility with current browsers and devices.
  //
  //  Reference:
  //  - <https://github.com/babel/babel-loader#readme>
  {
    test: /\.js$/,
    include: dirs.scripts,
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: 'last 2 versions'
            },
            useBuiltIns: 'usage',
            corejs: 3
          }
        ]
      ]
    }
  },

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

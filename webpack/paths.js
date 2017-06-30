/*
 * `paths.js`
 * ==========
 *
 * Project directories and file paths.
 */

'use strict';

const path = require('path');

const CWD = process.cwd();

module.exports = {
  context: path.resolve(CWD, 'app'),
  public: path.resolve(CWD, 'app'),
  dist: path.resolve(CWD, 'dist')
};

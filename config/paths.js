/*
 * `paths.js`
 * ==========
 *
 * Project directories and file paths.
 */

'use strict';

const path = require('path');
const CWD = process.cwd();

exports.root = CWD;
exports.context = path.resolve(CWD, 'app/');
exports.public = path.resolve(CWD, 'app/static/');
exports.dist = path.resolve(CWD, 'dist/');

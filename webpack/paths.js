/*
 * `paths.js`
 * ==========
 *
 * Project directories and file paths.
 */

'use strict';

const path = require('path');

const CWD = process.cwd();
const PHASER_CUSTOM_BUILDS = 'phaser-ce/build/custom';

module.exports = {
  context: path.resolve(CWD, 'app'),
  public: path.resolve(CWD, 'app'),
  dist: path.resolve(CWD, 'dist'),
  libs: {
    p2: require.resolve(`${PHASER_CUSTOM_BUILDS}/p2.js`),
    PIXI: require.resolve(`${PHASER_CUSTOM_BUILDS}/pixi.js`),
    Phaser: require.resolve(`${PHASER_CUSTOM_BUILDS}/phaser-split.js`)
  }
};

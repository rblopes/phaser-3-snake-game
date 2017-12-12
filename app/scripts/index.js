/*
 * `app` module
 * ============
 *
 * Provides the game initialization routine.
 */

//  Required: import Babel polyfills.
import '@babel/polyfill';

//  Make Phaser globally available.
import 'phaser';

//  Import configuration and game scenes.
import * as config from './constants/config';
import * as scenes from './scenes';

//  Add all required scenes and boot the game.
function init() {
  return Object.entries(scenes).reduce(
    (g, [k, S]) => ((g.scene.add(k, S, k === 'Game'), g)),
    new Phaser.Game(config)
  );
}

init();

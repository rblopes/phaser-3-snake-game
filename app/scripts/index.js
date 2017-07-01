/*
 * `app` module
 * ============
 *
 * Provides the game initialization routine.
 */

//  Required: import Babel polyfills.
import 'babel-polyfill';

//  Import Phaser.
import 'phaser';

//  Import configuration and game states.
import * as config from './constants/config';
import * as states from './states';

//  Add all required states and boot the game.
function init() {
  return Object.entries(states).reduce(
    (g, [k, S]) => ((g.state.add(k, S, k === 'Maze'), g)),
    new Phaser.Game(config)
  );
}

init();

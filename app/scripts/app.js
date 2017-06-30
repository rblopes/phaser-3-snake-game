/*
 * `app` module
 * ============
 *
 * Provides the game initialization routine.
 */

// Required: import Babel polyfills.
import 'babel-polyfill';

// Import Phaser and its dependencies
import 'p2';
import 'PIXI';
import 'Phaser';

// Import configuration and game states.
import * as config from './constants/config';
import * as states from './constants/states';

export function init() {
  const game = new Phaser.Game(config);

  // Dynamically add all required game states.
  Object
    .entries(states)
    .forEach(([key, state]) => game.state.add(key, state));

  game.state.start('Boot');

  return game;
}

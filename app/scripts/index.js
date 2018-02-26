/*
 * `app` module
 * ============
 *
 * Provides the game initialization routine.
 */

//  Import game instance configuration.
import * as config from './constants/config';

//  Boot the game.
export function boot() {
  return new Phaser.Game(config);
}

boot();

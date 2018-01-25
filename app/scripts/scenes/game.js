/*
 * `Game` scene
 * ============
 *
 * The main game scene.
 */

import files from '../constants/assets';

export default class Game extends Phaser.Scene {
  constructor(config = {}) {
    super(Object.assign({files}, config));
  }

  create(/* data */) {
    this.add.image(0, 32, 'frame').setOrigin(0, 0);

    //  Run both scenes in parallel.
    this.scene
      .launch('Maze')
      .launch('Scoreboard');

    const maze = this.scene.get('Maze');
    const scoreboard = this.scene.get('Scoreboard');

    //  When a food gets eaten, update the score.
    maze.events.on('FOOD_EATEN', () => scoreboard.scorePoint());

    //  When game is over, tell the player.
    maze.events.on('SNAKE_DEAD', () => scoreboard.showGameOver());
  }
}

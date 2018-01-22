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
    const maze = this.scene.manager.getScene('Maze');
    const scoreboard = this.scene.manager.getScene('Scoreboard');

    const frame = this.add.image(0, 32, 'frame');
    frame.setOrigin(0, 0);

    this.scene
      .launch('Maze')
      .launch('Scoreboard');

    //  When a food gets eaten, update the score.
    maze.events.on('FOOD_EATEN', () => scoreboard.scorePoint());

    //  When game is over, tell the player.
    maze.events.on('SNAKE_DEAD', () => scoreboard.showGameOver());
  }
}

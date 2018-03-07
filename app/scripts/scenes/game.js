/*
 * `Game` scene
 * ============
 *
 * The main game scene.
 */

import files from '../constants/assets';
import fontConfig from '../constants/bitmap-fonts';

export default class Game extends Phaser.Scene {
  constructor() {
    super({key: 'Game', files});
  }

  init() {
    //  Register the bitmap font for use on the score board.
    this.cache.bitmapFont.add(
      fontConfig.image,
      Phaser.GameObjects.BitmapText.ParseRetroFont(this, fontConfig)
    );
  }

  create(/* data */) {
    this.add.image(0, 0, 'frame').setOrigin(0, 0);

    //  Get a reference of the scenes to start.
    const [scoreboard, maze] = ['Scoreboard', 'Maze']
      .map(k => this.scene.get(k));

    //  Run both scenes in parallel.
    this.scene
      .launch(scoreboard)
      .launch(maze);

    //  When a food gets eaten, update the score.
    maze.events.on('FOOD_EATEN', () => scoreboard.scorePoint());

    //  When game is over, tell the player.
    maze.events.on('SNAKE_DEAD', () => scoreboard.showGameOver());
  }
}

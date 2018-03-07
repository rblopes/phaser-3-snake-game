/*
 * `Scoreboard` scene
 * ==================
 *
 * Shows the player scored points.
 */

import {WIDTH} from '../constants/grid';
import fontConfig from '../constants/bitmap-fonts';

export default class Scoreboard extends Phaser.Scene {
  constructor() {
    super({key: 'Scoreboard'});
  }

  create(/* data */) {
    //  Make this viewport 16px tall, aligned at the top of the screen, with a
    //  margin of 16px from each size.
    this.cameras.main.setViewport(8, 8, 16 * WIDTH, 16);

    this.scoreLabel = this.add.dynamicBitmapText(0, 0, fontConfig.image);

    //  Align this label to the right side.
    this.gameOverLabel = this.add.image(16 * WIDTH, 0, 'game-over');
    this.gameOverLabel.setOrigin(1, 0);

    this.reset();
  }

  //  -------------------------------------------------------------------------

  updateScoreboard() {
    this.scoreLabel.text = String(this.points);
  }

  showGameOver() {
    this.gameOverLabel.visible = true;
  }

  reset() {
    this.gameOverLabel.visible = false;

    this.points = 0;
    this.updateScoreboard();
  }

  scorePoint() {
    this.points += 5;
    this.updateScoreboard();
  }
}

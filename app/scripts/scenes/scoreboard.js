/*
 * `Scoreboard` scene
 * ==================
 *
 * Shows the player scored points.
 */

import {WIDTH, LENGTH} from '../constants/grid';
import fontConfig from '../constants/bitmap-fonts';

export default class Scoreboard extends Phaser.Scene {
  constructor() {
    super({
      key: 'Scoreboard',

      //  Align the scene viewport to the top of the screen, with a margin of
      //  half the length of the grid unit (8px) around its edges.
      cameras: [{
        x: LENGTH / 2,
        y: LENGTH / 2,
        width: WIDTH * LENGTH,
        height: LENGTH
      }]
    });
  }

  create(/* data */) {
    //  Add the score numerals label.
    this.scoreLabel = this.add.bitmapText(0, 0, fontConfig.image);

    //  Align this label to the right side.
    this.gameOverLabel = this.add.image(WIDTH * LENGTH, 0, 'game-over');
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

/*
 * `Scoreboard` scene
 * ==================
 *
 * Shows the player scored points.
 */

import {WIDTH, LENGTH} from '@/constants/grid';
import fontConfig from '@/constants/bitmap-fonts';

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

  init({gameScene}) {
    //  Bind the maze events to update the score board.
    gameScene.events
      .on('food-eaten', points => this.updateScoreboard(points))
      .on('snake-died', () => this.showGameOver());
  }

  create(/* data */) {
    //  Add the score numerals label.
    this.scoreLabel = this.add.bitmapText(0, 0, fontConfig.image, '0');

    //  Align this label to the right side.
    this.gameOverLabel =
      this.add.bitmapText(WIDTH * LENGTH, 0, fontConfig.image, 'GAME OVER')
        .setOrigin(1, 0)
        .setVisible(false);
  }

  //  -------------------------------------------------------------------------

  updateScoreboard(points) {
    this.scoreLabel.setText(String(points));
  }

  showGameOver() {
    this.gameOverLabel.setVisible(true);
  }
}

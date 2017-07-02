/*
 * `Scoreboard` state
 * ==================
 *
 * Shows the player scored points.
 */

import {numerals as fontConfig} from '../constants/bitmap-fonts';

export default class Scoreboard extends Phaser.State {
  create(/* data */) {
    //  Make this viewport 16px tall, aligned at the top of the screen, with a
    //  margin of 16px from each size.
    this.cameras.main.setViewport(16, 16, 608, 16);

    this.registerBitmapFont(fontConfig);
    this.scoreLabel = this.add.dynamicBitmapText(0, 0, fontConfig.image);

    this.reset();
  }

  //  -------------------------------------------------------------------------

  registerBitmapFont(fontConfig) {
    this.cache.bitmapFont.add(
      fontConfig.image,
      Phaser.GameObjects.BitmapText.ParseRetroFont(this, fontConfig)
    );
  }

  updateScoreboard() {
    this.scoreLabel.text = String(this.points);
  }

  reset() {
    this.points = 0;
    this.updateScoreboard();
  }

  scorePoint() {
    this.points += 5;
    this.updateScoreboard();
  }
}

import {WIDTH, LENGTH} from '@/constants/grid';
import fontConfig from '@/constants/bitmap-fonts';

export default class Scoreboard extends Phaser.Scene {
  /**
   *  Shows the player scored points and the 'GAME OVER' message.
   *
   *  Upon initialization, it receives the host scene object and binds to its
   *  emitted events to receive updates.
   *
   *  @extends Phaser.Scene
   */
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

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} data - Initialization parameters.
   *  @param {Game} data.gameScene - The host scene.
   */
  init({gameScene}) {
    //  Bind the maze events to update the score board.
    gameScene.events
      .on('food-eaten', points => this.setScore(points))
      .on('snake-died', () => this.showGameOver());
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
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

  /**
   *  Updates the displayed game score.
   *
   *  @param {number} points - How many points the player scored.
   *  @private
   */
  setScore(points) {
    this.scoreLabel.setText(String(points));
  }

  /**
   *  Displays the 'GAME OVER' message.
   *
   *  @private
   */
  showGameOver() {
    this.gameOverLabel.setVisible(true);
  }
}

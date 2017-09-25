/*
 * `Game` scene
 * ============
 *
 * The main game scene.
 */

export default class Game extends Phaser.Scene {
  preload() {
    this.load.path = 'assets/';
    this.load.image(['food', 'body', 'frame', 'numerals', 'game-over']);
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

/*
 * `Game` scene
 * ============
 *
 * The main game scene.
 */

export default class Game extends Phaser.Scene {
  preload() {
    this.load.path = 'assets/';

    this.load.image('food');
    this.load.image('body');
    this.load.image('frame');
    this.load.image('numerals');
    this.load.image('game-over');
  }

  create(/* data */) {
    this.scene.launch('Maze');
    // this.scene.launch('Scoreboard');

    const frame = this.add.image(0, 32, 'frame');
    frame.setOrigin(0, 0);

    const maze = this.scene.manager.getScene('Maze');
    // const scoreboard = this.scene.manager.getScene('Scoreboard');

    //  When a food gets eaten, update the score.
    // maze.events.on('FOOD_EATEN', () => {
    //   scoreboard.scorePoint();
    // });

    //  When game is over, tell the player.
    // maze.events.on('SNAKE_DEAD', () => {
    //   scoreboard.showGameOver();
    // });
  }
}

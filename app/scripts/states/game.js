/*
 * `Game` state
 * ============
 *
 * The main game state.
 */

export default class Game extends Phaser.State {
  preload() {
    this.load.path = 'assets/';

    this.load.image('food');
    this.load.image('body');
    this.load.image('frame');
    this.load.image('numerals');
    this.load.image('game-over');
  }

  create(/* data */) {
    this.state.launch('Maze');
    this.state.launch('Scoreboard');

    const frame = this.add.image(0, 32, 'frame');
    frame.setOrigin(0, 0);

    const maze = this.state.manager.getState('Maze');
    const scoreboard = this.state.manager.getState('Scoreboard');

    //  When a food gets eaten, update the score.
    maze.events.on('FOOD_EATEN', () => {
      scoreboard.scorePoint();
    });

    //  When game is over, tell the player.
    maze.events.on('SNAKE_DEAD', () => {
      scoreboard.showGameOver();
    });
  }
}

/*
 * `Maze` scene
 * ============
 *
 * Where the actual game play happens.
 */

import Food from '../objects/food';
import Snake from '../objects/snake';

//  Events dispatched by this scene.
const FOOD_EATEN = new Phaser.Event('FOOD_EATEN');
const SNAKE_DEAD = new Phaser.Event('SNAKE_DEAD');

export default class Maze extends Phaser.Scene {
  create(/* data */) {
    //  Make this viewport 38 x 26 grid units in size -- each grid unit being
    //  16px worth.
    this.cameras.main.setViewport(16, 48, 608, 416);

    this.food = new Food(this, 3, 4);
    this.snake = new Snake(this, 8, 8);

    //  Create our keyboard controls.
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time/* , delta */) {
    const {food, snake, cursors} = this;

    if (!snake.alive) {
      this.events.dispatch(SNAKE_DEAD);
      this.scene.pause(this.scene.key);
      return;
    }

    //  Check which key is pressed, and then change the direction the snake is
    //  heading based on that. The checks ensure you don't double-back on
    //  yourself, for example if you're moving to the right and you press the
    //  LEFT cursor, it ignores it, because the only valid directions you can
    //  move in at that time is up and down.
    if (cursors.left.isDown) {
      snake.faceLeft();
    }
    else if (cursors.right.isDown) {
      snake.faceRight();
    }
    else if (cursors.up.isDown) {
      snake.faceUp();
    }
    else if (cursors.down.isDown) {
      snake.faceDown();
    }

    if (snake.update(time)) {
      //  If the snake updated, we need to check for collision against food.
      if (snake.collideWithFood(food)) {
        this.events.dispatch(FOOD_EATEN);
        food.reposition(snake);
      }
    }
  }
}

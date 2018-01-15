/*
 * `Maze` scene
 * ============
 *
 * Where the actual game play happens.
 */

import Food from '../objects/food';
import Snake from '../objects/snake';

export default class Maze extends Phaser.Scene {
  create(/* data */) {
    //  Make this viewport 38 x 26 grid units in size -- each grid unit being
    //  16px worth.
    this.cameras.main.setViewport(16, 48, 608, 416);

    this.food = new Food(this, 3, 4);
    this.snake = new Snake(this, 8, 8);

    //  Create our keyboard controls.
    this.cursors = this.input.keyboard.addKeys({
      leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    //  Count how long a key is being pressed down.
    this.keyDownCounter = 0;
  }

  update(time/* , delta */) {
    const {food, snake} = this;
    const {leftKey, rightKey} = this.cursors;

    if (!snake.alive) {
      this.events.emit('SNAKE_DEAD');
      this.scene.pause(this.scene.key);
      return;
    }

    //  NOTE: Since Phaser has yet to implement a reliable method for checking
    //  whether a given key has just been pressed up or down, we use this hack
    //  to count how long a key is being pressed.
    if (leftKey.isDown || rightKey.isDown) {
      this.keyDownCounter += 1;
    } else {
      this.keyDownCounter = 0;
    }

    //  Check which key is pressed, and then change the direction the snake is
    //  heading.
    if (leftKey.isDown && this.keyDownCounter < 2) {
      snake.turnLeft();
    } else if (rightKey.isDown && this.keyDownCounter < 2) {
      snake.turnRight();
    }

    if (snake.update(time)) {
      //  If the snake updated, we need to check for collision against food.
      if (snake.collideWithFood(food)) {
        this.events.emit('FOOD_EATEN');
        food.reposition(snake);
      }
    }
  }
}

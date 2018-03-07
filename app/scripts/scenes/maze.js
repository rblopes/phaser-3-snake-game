/*
 * `Maze` scene
 * ============
 *
 * Where the actual game play happens.
 */

import {WIDTH, HEIGHT} from '../constants/grid';
import Food from '../objects/food';
import Snake from '../objects/snake';

export default class Maze extends Phaser.Scene {
  constructor() {
    super({key: 'Maze'});
  }

  create(/* data */) {
    //  Resize and place this scene viewport to fit the game board, with a 8px
    //  margin around it.
    this.cameras.main.setViewport(8, 32, 16 * WIDTH, 16 * HEIGHT);

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
      this.scene.pause();
      return;
    }

    //  NOTE: Phaser still lacks a reliable method for checking when a key was
    //  just pressed. Our last resort is to update a counter for the duration
    //  of that key press and, based on its value, decide whether to change
    //  the snake direction or not on the next branching logic.
    if (leftKey.isDown || rightKey.isDown) {
      this.keyDownCounter += 1;
    }
    else {
      this.keyDownCounter = 0;
    }

    //  Check which key is pressed, and then change the direction the snake is
    //  heading.
    if (leftKey.isDown && this.keyDownCounter < 2) {
      snake.turnLeft();
    }
    else if (rightKey.isDown && this.keyDownCounter < 2) {
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

/*
 * `Snake` group
 * =============
 *
 * Handles the logic and appearance of the snake in the maze.
 */

import {WIDTH, HEIGHT} from '../constants/grid';
import {UP, DOWN, LEFT, RIGHT} from '../constants/directions';

export default class Snake {
  constructor(state, x, y) {
    this.headPosition = new Phaser.Geom.Point(x, y);

    this.body = state.add.group();

    this.head = this.body.create(x * 16, y * 16, 'body');
    this.head.setOrigin(0);

    this.alive = true;
    this.moveTime = 0;
    this.moveDelay = 100;
    this.tailPosition = new Phaser.Geom.Point(x, y);

    this.heading = RIGHT;
    this.direction = RIGHT;
  }

  update(time) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  faceLeft() {
    if (this.direction === UP || this.direction === DOWN) {
      this.heading = LEFT;
    }
  }

  faceRight() {
    if (this.direction === UP || this.direction === DOWN) {
      this.heading = RIGHT;
    }
  }

  faceUp() {
    if (this.direction === LEFT || this.direction === RIGHT) {
      this.heading = UP;
    }
  }

  faceDown() {
    if (this.direction === LEFT || this.direction === RIGHT) {
      this.heading = DOWN;
    }
  }

  move(time) {
    //  Based on the heading property (which is the arrow direction pressed) we
    //  update `headPosition` value accordingly.
    //
    //  The `Math.Wrap` call allow the snake to wrap around the screen, so when
    //  it goes off any of the sides it re-appears on the other.
    switch (this.heading) {
    case LEFT:
      this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, WIDTH);
      break;

    case RIGHT:
      this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, WIDTH);
      break;

    case UP:
      this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, HEIGHT);
      break;

    case DOWN:
      this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, HEIGHT);
      break;

    //  No default
    }

    this.direction = this.heading;

    //  Update the body segments and place the last coordinate into
    //  `this.tailPosition`.
    this.body.shiftPosition(
      this.headPosition.x * 16,
      this.headPosition.y * 16,
      1,
      this.tailPosition
    );

    //  Check to see if any of the body pieces have the same x/y as the head.
    //  If they do, the head ran into the body.
    let hitBody = this.body.getFirst({x: this.head.x, y: this.head.y}, 1);

    if (hitBody) {
      //  Game Over!
      this.alive = false;
      return false;
    }

    //  Update the timer ready for the next movement.
    this.moveTime = time + this.moveDelay;
    return true;
  }

  grow() {
    const newPart = this.body.create(
      this.tailPosition.x,
      this.tailPosition.y,
      'body'
    );
    newPart.setOrigin(0);
  }

  collideWithFood(food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();
      food.eat();

      //  For every 5 items of food eaten we'll increase the snake speed a
      //  little.
      if (this.moveDelay > 20 && food.total % 5 === 0) {
        this.moveDelay -= 5;
      }
      return true;
    }
    return false;
  }

  updateGrid(grid) {
    //  Remove all body pieces from valid positions list.
    this.body.children.each(segment => {
      let bx = segment.x / 16;
      let by = segment.y / 16;

      grid[by][bx] = false;
    });
    return grid;
  }
}

/*
 * `Snake` group
 * =============
 *
 * Handles the logic and appearance of the snake in the maze.
 */

import {WIDTH, HEIGHT} from '../constants/grid';

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

    this.direction = new Phaser.Geom.Point(1, 0);
    this.updated = true;
  }

  update(time) {
    if (time >= this.moveTime) {
      this.updated = true;
      return this.move(time);
    }
  }

  turnLeft() {
    //  Makes the snake rotate counter clockwise on the next update.
    if (this.updated) {
      this.direction.setTo(this.direction.y, -this.direction.x);

      this.updated = false;
    }
  }

  turnRight() {
    //  Makes the snake rotate clockwise on the next update.
    if (this.updated) {
      this.direction.setTo(-this.direction.y, this.direction.x);

      this.updated = false;
    }
  }

  hitBody() {
    //  Tells whether the snake run over its body or not.
    return Phaser.Actions.GetFirst(
      this.body.children.entries,
      {x: this.head.x, y: this.head.y},
      1
    );
  }

  move(time) {
    //  Update the snake position according to the direction the player wants
    //  it to move to. The `Math.Wrap` function call allows the snake to wrap
    //  around the screen edges, so when it goes off any side it should
    //  re-appear on the opposite side.
    this.headPosition.setTo(
      Phaser.Math.Wrap(this.headPosition.x + this.direction.x, 0, WIDTH),
      Phaser.Math.Wrap(this.headPosition.y + this.direction.y, 0, HEIGHT)
    );

    //  Update the body segments and place the last coordinate into
    //  `this.tailPosition`.
    Phaser.Actions.ShiftPosition(
      this.body.children.entries,
      this.headPosition.x * 16,
      this.headPosition.y * 16,
      1,
      this.tailPosition
    );

    //  Check to see if any of the body pieces have the same x/y as the head.
    //  If they do, the head ran into the body.
    if (this.hitBody()) {
      //  Game Over!
      this.alive = false;
      return false;
    }

    //  Update the timer ready for the next movement.
    this.moveTime = time + this.moveDelay;
    return true;
  }

  grow() {
    this.body.create(
      this.tailPosition.x,
      this.tailPosition.y,
      'body'
    ).setOrigin(0);
  }

  collideWithFood(food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();

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
      const bx = segment.x / 16;
      const by = segment.y / 16;

      grid[by][bx] = false;
    });

    return grid;
  }
}

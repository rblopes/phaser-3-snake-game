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

    this.heading = new Phaser.Geom.Point(1, 0);
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
      Phaser.Geom.Point.RPerp(this.heading);

      this.updated = false;
    }
  }

  turnRight() {
    //  Makes the snake rotate clockwise on the next update.
    if (this.updated) {
      Phaser.Geom.Point.Perp(this.heading);

      this.updated = false;
    }
  }

  move(time) {
    //  Based on the heading property we update `headPosition` value
    //  accordingly.
    //
    //  The `Math.Wrap` call allow the snake to wrap around the screen, so when
    //  it goes off any of the sides it re-appears on the other.
    if (this.heading.x < 0) {
      //  Snake is heading left.
      this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, WIDTH);
    }
    if (this.heading.x > 0) {
      //  Snake is heading right.
      this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, WIDTH);
    }
    if (this.heading.y < 0) {
      //  Snake is heading up.
      this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, HEIGHT);
    }
    if (this.heading.y > 0) {
      //  Snake is heading down.
      this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, HEIGHT);
    }

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
    const hitBody = Phaser.Actions.GetFirst(
      this.body.children.entries,
      {x: this.head.x, y: this.head.y},
      1
    );

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

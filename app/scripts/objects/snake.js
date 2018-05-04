import {WIDTH, HEIGHT, LENGTH} from '@/constants/grid';

export default class Snake {
  /**
   *  Handles the logic and appearance of the snake in the maze.
   *
   *  @param {Phaser.Scene} scene - The scene that owns this object.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    this.body = scene.add.group({
      defaultKey: 'body',
      createCallback: o => o.setOrigin(0)
    });

    this.head = this.body.create(x * LENGTH, y * LENGTH);

    this.direction = new Phaser.Geom.Point(LENGTH, 0);
    this.headPosition = new Phaser.Geom.Point(0, 0);
    this.tailPosition = new Phaser.Geom.Point(0, 0);

    this.alive = true;
    this.updated = true;
    this.moveTime = 0;
    this.moveDelay = 100;
  }

  /**
   *  Updates the snake segments in the maze.
   *
   *  @public
   *  @param {number} time - The current game clock value.
   *  @returns {boolean} Whether the snake updated or not.
   */
  update(time) {
    if (time >= this.moveTime) {
      this.updated = true;
      return this.move(time);
    }

    return false;
  }

  /**
   *  Makes the snake rotate counter clockwise on the next update.
   *
   *  @public
   */
  turnLeft() {
    if (this.updated) {
      this.direction.setTo(this.direction.y, -this.direction.x);

      this.updated = false;
    }
  }

  /**
   *  Makes the snake rotate clockwise on the next update.
   *
   *  @public
   */
  turnRight() {
    if (this.updated) {
      this.direction.setTo(-this.direction.y, this.direction.x);

      this.updated = false;
    }
  }

  /**
   *  Tells whether the snake run over its body or not.
   *
   *  @private
   *  @returns {boolean} True if the snake collided with itself.
   */
  hitBody() {
    return Phaser.Actions.GetFirst(
      this.body.children.entries,
      {x: this.head.x, y: this.head.y},
      1
    );
  }

  /**
   *  Moves the snake segments around the maze.
   *
   *  @private
   *  @param {number} time - The current game clock value.
   *  @returns {boolean} Whether the snake has moved or not.
   */
  move(time) {
    //  Update the snake position according to the direction the player wants
    //  it to move to. The `Math.Wrap` function call allows the snake to wrap
    //  around the screen edges, so when it goes off any side it should
    //  re-appear on the opposite side.
    this.headPosition.setTo(
      Phaser.Math.Wrap(this.head.x + this.direction.x, 0, WIDTH * LENGTH),
      Phaser.Math.Wrap(this.head.y + this.direction.y, 0, HEIGHT * LENGTH)
    );

    //  Update the body segments and place the last coordinate into
    //  `this.tailPosition`.
    Phaser.Actions.ShiftPosition(
      this.body.children.entries,
      this.headPosition.x,
      this.headPosition.y,
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

  /**
   *  Adds a new segment to the snake.
   *
   *  @private
   */
  grow() {
    this.body.create(this.tailPosition.x, this.tailPosition.y);
  }

  /**
   *  Checks if the snake has collided with a piece of food.
   *
   *  @public
   *  @param {Food} food - A food sprite.
   *  @param {number} points - The player scored points.
   *  @returns {boolean} True if the snake collided, false otherwise.
   */
  collideWithFood(food, points) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();

      //  For every 5 pieces of food eaten we'll increase the snake speed a
      //  little.
      if (this.moveDelay > 20 && points % 25 === 0) {
        this.moveDelay -= 5;
      }

      return true;
    }

    return false;
  }

  /**
   *  Validates the positions on the grid where a new piece of food can be
   *  placed.
   *
   *  @protected
   *  @param {boolean.<array[]>} grid - A grid of positions to validate.
   *  @returns {boolean.<array[]>} The updated grid.
   */
  updateGrid(grid) {
    //  Remove all body pieces from valid positions list.
    for (const segment of this.body.getChildren()) {
      const x = segment.x / LENGTH;
      const y = segment.y / LENGTH;

      grid[y][x] = false;
    }

    return grid;
  }
}

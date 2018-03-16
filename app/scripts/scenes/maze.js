import {WIDTH, HEIGHT, LENGTH} from '@/constants/grid';
import Food from '@/objects/food';
import Snake from '@/objects/snake';

export default class Maze extends Phaser.Scene {
  /**
   *  Where the actual game play happens. Control and logic updates are
   *  handled by the Game scene, though.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({
      key: 'Maze',

      //  Make the viewport an exact fit of the game board, giving a margin of
      //  half the grid length (8px) around its edges.
      cameras: [{
        x: LENGTH / 2,
        y: 2 * LENGTH,
        width: WIDTH * LENGTH,
        height: HEIGHT * LENGTH
      }]
    });
  }

  //  ------------------------------------------------------------------------

  /**
   *  Add the food sprite at the given grid coordinates.
   *
   *  @protected
   *  @param {number} [x=0] - The horizontal grid coordinate.
   *  @param {number} [y=x] - The vetical grid coordinate.
   *  @return {Food} The food sprite.
   */
  addFood(x = 0, y = x) {
    return new Food(this, x, y);
  }

  /**
   *  Add the snake group at the given grid coordinates.
   *
   *  @protected
   *  @param {number} [x=0] - The horizontal grid coordinate.
   *  @param {number} [y=x] - The vetical grid coordinate.
   *  @return {Snake} The snake sprite.
   */
  addSnake(x = 0, y = x) {
    return new Snake(this, x, y);
  }
}

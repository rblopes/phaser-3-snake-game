/*
 * `Maze` scene
 * ============
 *
 * Where the actual game play happens.
 */

import {WIDTH, HEIGHT, LENGTH} from '@/constants/grid';
import Food from '@/objects/food';
import Snake from '@/objects/snake';

export default class Maze extends Phaser.Scene {
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

  addFood(x = 0, y = x) {
    return new Food(this, x, y);
  }

  addSnake(x = 0, y = x) {
    return new Snake(this, x, y);
  }
}

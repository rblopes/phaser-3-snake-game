/*
 * `Food` sprite
 * =============
 *
 * The food to be eaten by the snake.
 */

import {WIDTH, HEIGHT} from '../constants/grid';

export default class Food extends Phaser.GameObjects.Image {
  constructor(state, x, y) {
    super(state, x * 16, y * 16, 'food').setOrigin(0);
    state.children.add(this);
  }

  /**
   * We can place the food anywhere in our 40x30 grid *except* on-top of the
   * snake, so we need to filter those out of the possible food locations. If
   * there aren't any locations left, they've won!
   *
   * @return {boolean} true if the food was placed, otherwise false
   */
  reposition(snake) {
    //  First, create a grid that assumes all positions are valid for the new
    //  piece of food.
    const testGrid = Array.from(
      {length: HEIGHT},
      () => Array.from({length: WIDTH}, () => true)
    );

    snake.updateGrid(testGrid);

    //  Purge out false positions.
    const validLocations = [];

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (testGrid[y][x] === true) {
          //  Is this position valid for food? If so, add it here...
          validLocations.push({x, y});
        }
      }
    }

    if (validLocations.length > 0) {
      //  Use the RNG to pick a random food position.
      let pos = Phaser.Math.RND.pick(validLocations);

      //  And place it.
      this.setPosition(pos.x * 16, pos.y * 16);

      return true;
    }

    return false;
  }
}

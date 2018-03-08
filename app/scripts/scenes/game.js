/*
 * `Game` scene
 * ============
 *
 * The main game scene.
 */

export default class Game extends Phaser.Scene {
  constructor() {
    super({key: 'Game'});
  }

  init() {
    //  Game points.
    this.points = 0;
  }

  create(/* data */) {
    //  Put the frame behind the maze.
    this.add.image(0, 0, 'frame').setOrigin(0, 0);

    //  Get a reference of the scenes to start.
    const [scoreboard, maze] = ['Scoreboard', 'Maze']
      .map(k => this.scene.get(k));

    //  Run both scenes in parallel.
    this.scene
      .launch(scoreboard, {gameScene: this})
      .launch(maze);

    //  Add the game objects to the maze scene.
    this.food = maze.addFood(3, 4);
    this.snake = maze.addSnake(8, 8);

    //  Create our keyboard controls.
    this.cursors = this.input.keyboard.addKeys({
      leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    //  Count how long a key is being pressed down.
    this.keyDownCounter = 0;
  }

  update(time) {
    if (this.snake.alive) {
      this.updateInput();
      this.updateLogic(time);
    }
  }

  //  ------------------------------------------------------------------------

  updateInput() {
    const {leftKey, rightKey} = this.cursors;

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

    //  Check which key is pressed, then change the direction the snake is
    //  heading.
    if (leftKey.isDown && this.keyDownCounter < 2) {
      this.snake.turnLeft();
    }
    else if (rightKey.isDown && this.keyDownCounter < 2) {
      this.snake.turnRight();
    }
  }

  updateLogic(time) {
    const {food, snake} = this;

    if (snake.update(time)) {
      //  If the snake updated, we need to check for collision against food.
      if (snake.collideWithFood(food, this.points)) {
        this.updatePoints();
        food.reposition(snake);
      }
    }

    if (!snake.alive) {
      this.endGame();
    }
  }

  endGame() {
    this.events.emit('snake-died');
  }

  updatePoints() {
    this.points += 5;
    this.events.emit('food-eaten', this.points);
  }
}

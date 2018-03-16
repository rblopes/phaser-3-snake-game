export default class Game extends Phaser.Scene {
  /**
   *  The main game scene. It spawns the other two game scenes in parallel.
   *  One is the score board, showing the player points and the eventual 'GAME
   *  OVER' message. The other is the maze where the actual game action
   *  happens. Player input and game logic updates are handled here.
   *
   *  This scene emits two events:
   *    - `food-eaten`: When a food gets eaten by the snake.
   *    - `snake-died`: When the snake collides with itself.
   *
   *  Those events are used to update the score board.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});

    /**
     *  Keep the last high score registered.
     */
    this.highScore = 0;
  }

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  init(/* data */) {
    /**
     *  Current game score.
     */
    this.points = 0;
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    //  Put the frame behind the maze.
    this.add.image(0, 0, 'frame').setOrigin(0, 0);

    //  Get a reference of the scenes to start.
    const scoreboard = this.scene.get('Scoreboard');
    const maze = this.scene.get('Maze');

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

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} time - Current internal clock time.
   *  @param {number} delta - Time elapsed since last update.
   */
  update(time) {
    if (this.snake.alive) {
      this.updateInput();
      this.updateLogic(time);
    }
  }

  //  ------------------------------------------------------------------------

  /**
   *  Handles user input.
   *
   *  @private
   */
  updateInput() {
    const {leftKey, rightKey} = this.cursors;

    //  NOTE: Phaser still lacks a reliable method for checking when a key was
    //  just pressed. Our last resort is to update a counter for the duration
    //  of that key press and, based on its value, decide whether to process
    //  the input or avoid it being processed repeatedly.
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

  /**
   *  Updates game logic.
   *
   *  @private
   */
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

  /**
   *  Announces game over.
   *
   *  @private
   */
  endGame() {
    this.events.emit('snake-died');

    //  Update the high score.
    this.highScore = Math.max(this.points, this.highScore);

    //  Wait for a moment and go back to the menu screen.
    this.time.delayedCall(2500, () => {
      this.scene
        .stop('Scoreboard')
        .stop('Maze')
        .start('Menu');
    });
  }

  /**
   *  Updates score points.
   *
   *  @private
   */
  updatePoints() {
    this.points += 5;
    this.events.emit('food-eaten', this.points);
  }
}

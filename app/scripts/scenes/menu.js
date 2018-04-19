export default class Menu extends Phaser.Scene {
  /**
   *  Show the game title and menu.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Menu'});
  }

  /**
   *  Responsible for setting up the game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    //  Save viewport center coordinates for reference.
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;

    //  Place the Title image above the middle of the screen.
    this.add.image(x, y - 80, 'title');

    //  Use a bitmap text object as the face of our start button.
    const startButton = this.add.bitmapText(x - 160, y + 80, 'font', 'START')
      .setOrigin(0.5, 1);

    //  Apply a blink effect to the button using a custom easing function.
    this.add.tween({
      targets: [startButton],
      ease: k => k < 0.5 ? 0 : 1,
      duration: 250,
      yoyo: true,
      repeat: -1,
      alpha: 0
    });

    //  Handle the click or tap of the button using an input zone slightly
    //  bigger than the text object.
    this.add.zone(
      startButton.x - (startButton.width * startButton.originX) - 16,
      startButton.y - (startButton.height * startButton.originY) - 16,
      startButton.width + 32,
      startButton.height + 32
    )
      .setInteractive()
      .once('pointerup', () => this.scene.start('Game'));

    //  Get the last game high score.
    const {highScore} = this.scene.get('Game');

    //  Display the registered highest score of the game.
    this.add.bitmapText(x + 160, y + 80, 'font', 'HIGH SCORE')
      .setOrigin(0.5, 1);
    this.add.bitmapText(x + 160, y + 81, 'font', `${highScore} POINTS`)
      .setOrigin(0.5, 0);
  }
}

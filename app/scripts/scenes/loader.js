import files from '@/constants/assets';
import fontConfig from '@/constants/bitmap-fonts';

export default class Loader extends Phaser.Scene {
  /**
   * Takes care of loading the main scene assets, including graphics and sound
   * effects, while displaying a busy splash screen.
   *
   * @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Loader', files});
  }

  /**
   * Called when this scene is initialized.
   *
   * @protected
   */
  init() {
    //  Register our custom bitmap font in he game system cache.
    this.cache.bitmapFont.add(
      fontConfig.image,
      Phaser.GameObjects.BitmapText.ParseRetroFont(this, fontConfig)
    );

    //  We are done here. Launch the game.
    this.scene.start('Game');
  }
}

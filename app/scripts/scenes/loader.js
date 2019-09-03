import fontConfig from '@/constants/bitmap-fonts';

export default class Loader extends Phaser.Scene {
  /**
   *  Takes care of loading the main game assets.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Loader'});
  }

  /**
   *  Declare which game assets need to be loaded.
   *
   *  @protected
   */
  preload() {
    this.load.image(['body', 'food', 'font', 'frame', 'title']);
  }

  /**
   *  Set up and launch the main scene.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    //  Register our custom bitmap font in he game system cache.
    this.cache.bitmapFont.add(
      fontConfig.image,
      Phaser.GameObjects.RetroFont.Parse(this, fontConfig)
    );

    //  We are done here. Launch the game menu.
    this.scene.start('Menu');
  }
}

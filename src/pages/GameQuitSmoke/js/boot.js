const config = {
  bootPreloadImages: [
    {
      key: 'preloadbar',
      url: require('../assets/images/preloadbar.png'),
    },
    {
      key: 'preloadbarBorder',
      url: require('../assets/images/preloadbar_border.png'),
    },
  ],

  audioSprite: {
    key: 'defaultRes_audio',
    urls: [require('../assets/audios/defaultRes_audio.mp3'), require('../assets/audios/defaultRes_audio.ogg')],
    atlasURL: require('../assets/audios/defaultRes_audio.json'),
  },

  imageSprite: {
    key: 'defaultRes',
    textureURL: require('../assets/images/defaultRes.png'),
    atlasURL: require('../assets/images/defaultRes.json'),
  },
};

// var boot = function(game){
//     console.log("%cStarting my awesome game", "color:white; background:red");
// }

class boot {
  init() {
    this.game.renderer.renderSession.roundPixels = true;
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // set physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.customConfig = config;
  }

  preload() {
    for (let i = 0; i < this.game.customConfig.bootPreloadImages.length; i++) {
      this.game.load.image(this.game.customConfig.bootPreloadImages[i].key, this.game.customConfig.bootPreloadImages[i].url);
    }
  }

  create() {
    this.game.config.enableDebug = false;
    this.game.stage.backgroundColor = '#000';
    this.game.state.start('Preload');
  }
}

export default boot;

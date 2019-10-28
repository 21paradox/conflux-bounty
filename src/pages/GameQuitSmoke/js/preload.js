import addText from './helper';

const preload = function(game) {};

preload.prototype = {
  preload() {
    // this add Text if come from libs/helper.js
    addText(this.game, this.game.world.centerX, this.game.world.centerY - 100, 'Quit\n Smoking', '80px Arial');

    this.loadProcess = addText(this.game, this.game.world.centerX, this.game.world.centerY + 100, 'Loading 0%', '14px Arial');

    // addText(this.game,
    //     this.game.world.centerX,
    //     this.game.world.height - 30,
    //     "Author: hexcola\n Inspired by a Quit Smoking Poster", "14px Arial");

    this.preloadbarBorder = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 60, 'preloadbarBorder');
    this.preloadbarBorder.anchor.setTo(0.5);

    this.preloadbar = this.add.sprite(this.game.world.centerX - 83.5, this.game.world.centerY + 60, 'preloadbar');
    this.preloadbar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.preloadbar);

    this.load.onLoadComplete.add(this.loadComplete, this);

    // load audio resource
    this.game.load.audiosprite(
      this.game.customConfig.audioSprite.key,
      this.game.customConfig.audioSprite.urls,
      null,
      this.game.customConfig.audioSprite.atlasURL
    );

    this.game.load.atlasJSONArray(
      this.game.customConfig.imageSprite.key,
      this.game.customConfig.imageSprite.textureURL,
      null,
      this.game.customConfig.imageSprite.atlasURL
    );
  },

  loadUpdate() {
    this.loadProcess.setText(`Loading ${this.load.progress}%`);
  },

  loadComplete() {
    this.ready = true;
    console.log('loadComplete');
  },

  create() {
    this.game.allAudios = this.game.add.audioSprite('defaultRes_audio');
    this.game.allAudios.allowMultiple = true;

    this.loadProcess.kill();
    this.preloadbarBorder.kill();
    this.preloadbar.kill();

    const btn_start = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'defaultRes', 'btn_start.png');
    btn_start.anchor.set(0.5);
    btn_start.inputEnabled = true;

    btn_start.events.onInputDown.add(() => {
      this.state.start('Gameplay');
    }, this);

    // this.game.state.start('MainMenu');
  },
};

export default preload;

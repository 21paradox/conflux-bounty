import addText from './helper';
/** ************************************************************
 * MENU
 ************************************************************ */

const mainMenu = function(game) {};

mainMenu.prototype = {
  init() {
    if (this.game.isDebug) {
      this.time.advancedTiming = true;
    } else {
      this.time.advancedTiming = false;
    }
  },

  create() {
    this.game.allAudios.play('menu');

    // this add Text if come from libs/helper.js
    addText(this.game, this.game.world.centerX, this.game.world.centerY - 100, 'Quit\n Smoking', '80px Arial');

    addText(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 30,
      'Author: hexcola\n Inspired by a Quit Smoking Poster',
      '14px Arial'
    );

    const btn_start = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'defaultRes', 'btn_start.png');

    btn_start.anchor.set(0.5);
    btn_start.inputEnabled = true;
    btn_start.events.onInputDown.add(this.startGame, this);
  },

  startGame() {
    this.state.start('Gameplay');
    this.game.allAudios.stop();
  },

  render() {
    if (this.game.isDebug) {
      this.game.debug.text(`FPS:${this.game.time.fps}`, 10, 20, '#ffffff');
    }
  },
};

export default mainMenu;

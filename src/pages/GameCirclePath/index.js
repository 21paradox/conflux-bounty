import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { i18nTxt, i18nTxtAsync } from '../../utils';

// const PIXI = require('phaser/build/pixi.js');
// window.PIXI = PIXI;
// const p2 = require('phaser/build/p2.js')
// window.p2 = p2;
// const Phaser = require('phaser/build/phaser.js')
// window.Phaser = Phaser;

import { loadPhaser } from './utils';
import { playGame } from './js/game';

// eslint-disable-next-line react/prefer-stateless-function
class GameCirclePath extends Component {
  constructor(...args) {
    super(...args);
    document.title = i18nTxt('1');

    // let ball;
    // const fullWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // const fullHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // var game = new Phaser.Game(fullWidth, fullHeight, Phaser.AUTO, null, { preload: preload, create: create, update: update });

    // function preload() {
    //   game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //   game.stage.setBackgroundColor('#fff')
    //   game.load.image('ball', Ball);
    //   game.load.image('paddle', Paddle);
    // }
    // function create() {
    //   game.physics.startSystem(Phaser.Physics.ARCADE);
    //   ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
    // }
    // function update() {
    // }
  }

  componentDidMount() {
    loadPhaser().then(() => {
      // const gameBestWidth = 520;
      // const gameBestHeight = 720;
      // const gameBestRatio = gameBestWidth / gameBestHeight;

      // // Get viewport ratio.
      // const viewport_w = window.innerWidth;
      // const viewport_h = window.innerHeight - 10;
      // const viewportRatio = viewport_w / viewport_h;

      // const content = document.getElementById('content');

      // if (gameBestRatio > viewportRatio) {
      //   // take viewport height as base value
      //   content.style.width = `${viewport_w}px`;
      //   content.style.height = `${viewport_w / gameBestRatio}px`;
      // } else if (gameBestRatio < viewportRatio) {
      //   // take viewport width as base value
      //   content.style.height = `${viewport_h}px`;
      //   content.style.width = `${viewport_h * gameBestRatio}px`;
      // }

      // const game = new Phaser.Game(gameBestWidth, gameBestHeight, Phaser.CANVAS, 'content');
      // game.state.add('Boot', require('./js/boot').default);
      // game.state.add('MainMenu', require('./js/mainmenu').default);
      // game.state.add('Preload', require('./js/preload').default);
      // game.state.add('Gameplay', require('./js/gameplay').default);
      // game.state.start('Boot');
      const game = new Phaser.Game(640, 960, Phaser.CANVAS, '');
      game.state.add('PlayGame', playGame);
      game.state.start('PlayGame');
    });
  }

  render() {
    return <div id="content"></div>;
  }
}

export default connect()(GameCirclePath);

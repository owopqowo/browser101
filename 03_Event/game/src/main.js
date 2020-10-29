'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import GameBuilder from './game.js';

const game = new GameBuilder().withGameDuration(10000).withCarrotCount(8).withBugCount(6).withCarrotSize(80).withBugSize(50).build();
const gameFinishBanner = new PopUp();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case 'cancel':
      message = 'Replay?';
      sound.playAlert();
      break;
    case 'win':
      message = 'GAME CLEAR';
      sound.playWin();
      break;
    case 'lose':
      message = 'GAME OVER';
      sound.playBug();
      break;
    default:
      throw newError('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});

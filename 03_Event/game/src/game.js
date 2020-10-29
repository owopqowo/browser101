'use strict';

import * as sound from './sound.js';
import Field from './field.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

//builder pattern
export default class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  withCarrotSize(num) {
    this.carrotSize = num;
    return this;
  }

  withBugSize(num) {
    this.bugSize = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount,
      this.carrotSize,
      this.bugSize
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount, carrotSize, bugSize) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.carrotSize = carrotSize;
    this.bugSize = bugSize;

    this.time = document.querySelector('.time');
    this.count = document.querySelector('.count');
    this.btnPlay = document.querySelector('.btn-play');

    this.btnPlay.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount, carrotSize, bugSize);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.timer = undefined;
    this.score = 0;
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item == 'carrot') {
      this.score++;
      sound.playCarrot();
      this.updateScore();
      if (this.score == this.carrotCount) {
        sound.playWin();
        this.stop(Reason.win);
      }
    } else if (item == 'bug') {
      sound.playBug();
      this.stop(Reason.lose);
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  stop(reason) {
    this.started = false;
    this.gameField.field.innerHTML = '';
    this.hideStopBtn();
    this.hideTimeAndScore();
    this.stopGameTimer();
    sound.stopBg();
    this.onGameStop && this.onGameStop(reason);
  }
  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimeAndScore();
    this.startGameTimer();
    //this.gameFinishBanner.hide();
    sound.playBg();
  }

  showStopBtn() {
    const iconPlay = this.btnPlay.querySelector('.fa-play');
    if (iconPlay) {
      iconPlay.classList.replace('fa-play', 'fa-stop');
    }
  }
  hideStopBtn() {
    const iconPlay = this.btnPlay.querySelector('.fa-stop');
    if (iconPlay) {
      iconPlay.classList.replace('fa-stop', 'fa-play');
    }
  }
  updateScore() {
    this.count.innerText = this.carrotCount - this.score;
  }
  showTimeAndScore() {
    this.time.style.visibility = 'visible';
    this.count.style.visibility = 'visible';
  }
  hideTimeAndScore() {
    this.time.style.visibility = 'hidden';
    this.count.style.visibility = 'hidden';
  }
  initGame() {
    this.gameField.init();
    this.score = 0;
    this.count.innerText = this.carrotCount - this.score;
  }
  startGameTimer() {
    let remainingTime = this.gameDuration / 10;
    this.updateTimeText(remainingTime);
    this.timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount == this.score ? Reason.win : Reason.lose);
        sound.playAlert();
        return;
      }
      this.updateTimeText(--remainingTime);
    }, 10);
  }
  stopGameTimer() {
    clearInterval(this.timer);
  }
  updateTimeText(milliSec) {
    let seconds = Math.floor(milliSec / 100);
    let milliseconds = milliSec % 100;
    if (seconds.toString().length == 1) {
      seconds = '0' + seconds;
    }
    if (milliseconds.toString().length == 1) {
      milliseconds = '0' + milliseconds;
    }
    this.time.innerHTML = `${seconds}:${milliseconds}`;
  }
}

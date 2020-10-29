'use strict';

import * as sound from './sound.js';

export default class Field {
  constructor(carrotCount, bugCount, carrotSize, bugSize) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.carrotSize = carrotSize;
    this.bugSize = bugSize;
    this.field = document.querySelector('.game-field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, 'img/carrot.png', this.carrotSize);
    this._addItem('bug', this.bugCount, 'img/bug.png', this.bugSize);
  }
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }
  _addItem(className, number, imgSrc, imgSize) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - imgSize;
    const y2 = this.fieldRect.height - imgSize;
    for (let index = 0; index < number; index++) {
      const Item = document.createElement('img');
      Item.setAttribute('src', imgSrc);
      Item.setAttribute('class', className);
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      Item.style.left = `${x}px`;
      Item.style.top = `${y}px`;
      this.field.appendChild(Item);
    }
  }

  //this binding
  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
      sound.playBug();
    }
  };
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

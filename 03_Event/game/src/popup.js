'use strict';

export default class PopUp {
  constructor() {
    this.popup = document.querySelector('.popup');
    this.popupText = document.querySelector('.text');
    this.btnReplay = document.querySelector('.btn-replay');
    this.btnReplay.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }
  showWithText(text) {
    this.popup.classList.remove('hide');
    this.popupText.innerText = text;
  }
  hide() {
    this.popup.classList.add('hide');
  }
}

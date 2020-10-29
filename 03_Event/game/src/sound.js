'use strict';

const soundBug = document.querySelector('.sound-bug');
const soundCarrot = document.querySelector('.sound-carrot');
const soundBg = document.querySelector('.sound-bg');
const soundAlert = document.querySelector('.sound-alert');
const soundWin = document.querySelector('.sound-win');

export function playCarrot() {
  playSound(soundCarrot);
}
export function playBug() {
  playSound(soundBug);
}
export function playAlert() {
  playSound(soundAlert);
}
export function playWin() {
  playSound(soundWin);
}
export function playBg() {
  playSound(soundBg);
}
export function stopBg() {
  stopSound(soundBg);
}
function playSound(soundName) {
  soundName.currentTime = 0;
  soundName.play();
}
function stopSound(soundName) {
  soundName.pause();
}

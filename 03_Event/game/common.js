let setTimer;
const btnPlay = document.querySelector('.btn-play');
const btnStop = document.querySelector('.btn-stop');

const count = document.querySelector('.count');

const gameField = document.querySelector('.game-field');

const popup = document.querySelector('.popup');
const text = document.querySelector('.text');
const btnReplay = document.querySelector('.btn-replay');

const soundBg = document.querySelector('.sound-bg');
const soundAlert = document.querySelector('.sound-alert');
const soundBug = document.querySelector('.sound-bug');
const soundCarrot = document.querySelector('.sound-carrot');
const soundWin = document.querySelector('.sound-win');

btnPlay.addEventListener('click', (event) => {
  num = 10;

  btnPlay.style.display = 'none';
  btnStop.style.display = 'block';

  setTimer = setInterval(timer, 10);

  popup.classList.add('hide');
  while (gameField.hasChildNodes()) {
    gameField.removeChild(gameField.firstChild);
  }
  randomImg();
  soundBg.play();
});

btnStop.addEventListener('click', (event) => {
  num = 10;
  count.textContent = 10;
  btnStop.style.display = 'none';
  btnPlay.style.display = 'block';
  clearInterval(setTimer);
  seconds = 9;
  milliseconds = 100;
  time.innerHTML = '10:00';
  while (gameField.hasChildNodes()) {
    gameField.removeChild(gameField.firstChild);
  }
  soundBg.pause();
});

btnReplay.addEventListener('click', (event) => {
  num = 10;
  count.textContent = 10;
  btnPlay.style.display = 'none';
  btnStop.style.display = 'block';
  clearInterval(setTimer);
  seconds = 9;
  milliseconds = 100;
  time.innerHTML = '10:00';
  setTimer = setInterval(timer, 10);
  popup.classList.add('hide');
  while (gameField.hasChildNodes()) {
    gameField.removeChild(gameField.firstChild);
  }
  randomImg();
  soundBg.play();
});

if (gameField.hasChildNodes) {
  gameField.addEventListener('click', (event) => {
    if (event.target.classList.contains('carrot')) {
      carrotCount();
      event.target.remove();
      soundCarrot.play();
    } else if (event.target.classList.contains('bug')) {
      clearInterval(setTimer);
      btnStop.style.display = 'none';
      btnPlay.style.display = 'none';
      soundBug.play();
      soundBg.pause();
      popup.setAttribute('data-name', 'game-over');
      popupText();
      popup.classList.remove('hide');
    }
  });
}

//timer
const time = document.querySelector('.time');
let seconds = 9;
let milliseconds = 100;
function timer() {
  --milliseconds;
  if (seconds.toString().length == 1) {
    seconds = '0' + seconds;
  }
  if (milliseconds.toString().length == 1) {
    milliseconds = '0' + milliseconds;
  }
  if (milliseconds <= 0 && seconds > 0) {
    milliseconds = 100;
    --seconds;
  }
  time.innerHTML = `${seconds}:${milliseconds}`;
  if (seconds <= 0 && milliseconds <= 0) {
    clearInterval(setTimer);
    btnStop.style.display = 'none';
    btnPlay.style.display = 'none';
    seconds = 9;
    milliseconds = 100;
    time.innerHTML = '00:00';
    soundBg.pause();
    popup.setAttribute('data-name', 'time-over');
    popupText();
    popup.classList.remove('hide');
    soundAlert.play();
  }
}

function popupText() {
  const popupData = popup.getAttribute('data-name');
  switch (popupData) {
    case 'time-over':
      text.textContent = 'TIME OVER';
      break;
    case 'game-over':
      text.textContent = 'GAME OVER';
      break;
    case 'game-clear':
      text.textContent = 'GAME CLEAR';
      break;
    default:
      text.textContent = 'REPLAY?';
      break;
  }
}

function randomImg() {
  const gameFieldW = gameField.clientWidth;
  const gameFieldH = gameField.clientHeight;

  bugLength = 7;
  for (let index = 0; index < bugLength; index++) {
    const bugSize = 50;
    const x = Math.floor(Math.random() * (gameFieldW - bugSize));
    const y = Math.floor(Math.random() * (gameFieldH - bugSize));
    const bug = document.createElement('img');
    bug.setAttribute('class', 'bug');
    bug.setAttribute('src', 'img/bug.png');
    bug.style.transform = `translate(${x}px, ${y}px)`;
    gameField.appendChild(bug);
  }
  carrotLength = 10;
  for (let index = 0; index < carrotLength; index++) {
    const carrotSize = 80;
    const x = Math.floor(Math.random() * (gameFieldW - carrotSize));
    const y = Math.floor(Math.random() * (gameFieldH - carrotSize));
    const carrot = document.createElement('img');
    carrot.setAttribute('class', 'carrot');
    carrot.setAttribute('src', 'img/carrot.png');
    carrot.style.transform = `translate(${x}px, ${y}px)`;
    gameField.appendChild(carrot);
  }
}

let num = 10;
function carrotCount() {
  --num;
  count.textContent = num;
  if (num == 0) {
    seconds = 9;
    milliseconds = 100;
    btnStop.style.display = 'none';
    clearInterval(setTimer);
    popup.setAttribute('data-name', 'game-clear');
    popupText();
    popup.classList.remove('hide');
    soundBg.pause();
    soundWin.play();
  }
}

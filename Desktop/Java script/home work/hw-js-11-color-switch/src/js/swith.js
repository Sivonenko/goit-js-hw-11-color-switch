import colors from './color.js';


const refs = {
  startBtn: document.querySelector('button[data-action="start"]'),
  stopBtn: document.querySelector('button[data-action="stop"]'),
  body: document.querySelector('body'),
  buttons: document.getElementsByTagName('button'),
};

let colorId = null;

refs.startBtn.addEventListener('click', changeColorHandler);
refs.stopBtn.addEventListener('click', stopChangingHandler);

function changeColorHandler() {
  activeButtonHandler(refs.stopBtn, refs.startBtn);

  colorId = setInterval(() => {
    return runRandomColor();
  }, 1000);
}

function stopChangingHandler() {
  activeButtonHandler(refs.startBtn, refs.stopBtn);
  clearInterval(colorId);
}

function runRandomColor() {
  const swithcColor = randomIntegerFromInterval(0, colors.length - 1);
  refs.body.style.backgroundColor = colors[swithcColor];
}

function activeButtonHandler(enabled, disabled) {
  disabled.setAttribute('disabled', 'disabled');
  enabled.removeAttribute('disabled');
}

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
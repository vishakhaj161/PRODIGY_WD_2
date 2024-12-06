/* script.js */
let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const lapsContainer = document.getElementById('laps');

document.getElementById('start-btn').addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 100);
  }
});

document.getElementById('pause-btn').addEventListener('click', () => {
  isRunning = false;
  clearInterval(timerInterval);
});

document.getElementById('reset-btn').addEventListener('click', () => {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateTimer();
  lapsContainer.innerHTML = '';
});

document.getElementById('lap-btn').addEventListener('click', () => {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsContainer.appendChild(lapItem);
  }
});

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}

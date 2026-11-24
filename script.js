const durationSelect = document.getElementById('durationSelect');
const startBtn = document.getElementById('startBtn');
const colorBtn = document.getElementById('colorBtn');
const playerBtn = document.getElementById('playerBtn');
const playerInfo = document.getElementById('playerInfo');
const scoreEl = document.getElementById('score');
const timeLeftEl = document.getElementById('timeLeft');
const arena = document.getElementById('arena');
const target = document.getElementById('target');
const resultBox = document.getElementById('resultBox');
const finalScoreEl = document.getElementById('finalScore');

let score = 0;
let timeLeft = Number(durationSelect.value);
let countdownId = null;
let isPlaying = false;

timeLeftEl.textContent = timeLeft;

durationSelect.addEventListener('change', () => {
    if (!isPlaying) {
        timeLeft = Number(durationSelect.value);
        timeLeftEl.textContent = timeLeft;
    }
});

function moveTarget() {
    const maxX = Math.max(0, arena.clientWidth - target.offsetWidth);
    const maxY = Math.max(0, arena.clientHeight - target.offsetHeight);
    const randomX = Math.floor(Math.random() * (maxX + 1));
    const randomY = Math.floor(Math.random() * (maxY + 1));
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

function startGame() {
    clearInterval(countdownId);
    score = 0;
    timeLeft = Number(durationSelect.value);
    isPlaying = true;

    scoreEl.textContent = score;
    timeLeftEl.textContent = timeLeft;
    resultBox.hidden = true;
    arena.classList.remove('locked');
    durationSelect.disabled = true;
    startBtn.disabled = true;

    target.style.display = 'block';
    moveTarget();

    countdownId = setInterval(() => {
        timeLeft -= 1;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(countdownId);
    timeLeft = 0;
    timeLeftEl.textContent = 0;
    isPlaying = false;

    target.style.display = 'none';
    arena.classList.add('locked');
    durationSelect.disabled = false;
    startBtn.disabled = false;

    finalScoreEl.textContent = score;
    resultBox.hidden = false;
}

target.addEventListener('click', () => {
    if (!isPlaying) return;
    score += 1;
    scoreEl.textContent = score;
    moveTarget();
});

colorBtn.addEventListener('click', () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    arena.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

playerBtn.addEventListener('click', () => {
    playerInfo.hidden = !playerInfo.hidden;
});

startBtn.addEventListener('click', startGame);
// ==========================================
// 1. КЕРУВАННЯ РУХОМ КВАДРАТА (requestAnimationFrame)
// ==========================================
const box1 = document.getElementById('box1');
const stage1 = document.getElementById('stage1');

let posX = 0;
let speed = 2;
let animationId = null;
let isMoving = false;

function animateBox() {
  const maxDistance = stage1.clientWidth - box1.clientWidth;
  
  posX += speed;
  if (posX > maxDistance || posX < 0) {
    speed = -speed; // Відбивання від стінок
  }
  
  box1.style.left = posX + 'px';
  animationId = requestAnimationFrame(animateBox);
}

document.getElementById('btnStartMove').addEventListener('click', () => {
  if (!isMoving) {
    isMoving = true;
    animationId = requestAnimationFrame(animateBox);
  }
});

document.getElementById('btnPauseMove').addEventListener('click', () => {
  if (isMoving) {
    isMoving = false;
    cancelAnimationFrame(animationId);
  }
});

document.getElementById('btnResetMove').addEventListener('click', () => {
  isMoving = false;
  cancelAnimationFrame(animationId);
  posX = 0;
  speed = Math.abs(speed);
  box1.style.left = '0px';
});


// ==========================================
// 2. КЕРУВАННЯ ОБЕРТАННЯМ ТА МАСШТАБОМ (Inline Styles)
// ==========================================
const box2 = document.getElementById('box2');
let currentRotation = 0;
let currentScale = 1;

function updateTransform() {
  box2.style.transition = 'transform 0.4s ease';
  box2.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
}

document.getElementById('btnRotate').addEventListener('click', () => {
  currentRotation += 45;
  updateTransform();
});

document.getElementById('btnScale').addEventListener('click', () => {
  currentScale = currentScale === 1 ? 1.5 : 1;
  updateTransform();
});

document.getElementById('btnResetTransform').addEventListener('click', () => {
  currentRotation = 0;
  currentScale = 1;
  updateTransform();
});


// ==========================================
// 3. КЕРУВАННЯ CSS КЛАСАМИ ТА ШВИДКІСТЮ (Class Toggle)
// ==========================================
const circle1 = document.getElementById('circle1');
const btnTogglePulse = document.getElementById('btnTogglePulse');
const btnSpeedUp = document.getElementById('btnSpeedUp');
let isFast = false;

btnTogglePulse.addEventListener('click', () => {
  circle1.classList.toggle('pulse-animation');
  btnTogglePulse.classList.toggle('active');
});

btnSpeedUp.addEventListener('click', () => {
  isFast = !isFast;
  circle1.style.animationDuration = isFast ? '0.3s' : '1s';
  btnSpeedUp.classList.toggle('active', isFast);
  btnSpeedUp.innerText = isFast ? 'Уповільнити' : 'Прискорити';
});
const dimensions = {
  screenX: null,
  screenY: null,
  halfScreenX: null,
  halfScreenY: null,
}

const orientationData = {
  firstLoad: true,
  startAlpha: null,
  startBeta: null,
  minAlpha: null,
  maxAlpha: null,
  minBeta: null,
  maxBeta: null,
};

let cube = null;

const deviation = 30;
const ratio = 5;

function handleOrientation(event) {
  if (orientationData.firstLoad) {
    orientationData.firstLoad = false;
    orientationData.startAlpha = event.gamma;
    orientationData.startBeta = event.beta;
    orientationData.minAlpha = orientationData.startAlpha - deviation;
    orientationData.maxAlpha = orientationData.startAlpha + deviation;
    orientationData.minBeta = orientationData.startBeta - deviation;
    orientationData.maxBeta = orientationData.startBeta + deviation;
  }

  let alpha = event.gamma > orientationData.minAlpha && event.alpha < orientationData.maxAlpha ? event.gamma : event.gamma < orientationData.startAlpha ? orientationData.minAlpha : orientationData.maxAlpha;
  let beta = event.beta > orientationData.minBeta && event.beta < orientationData.maxBeta ? event.beta : event.beta < orientationData.startBeta ? orientationData.minBeta : orientationData.maxBeta;
  alpha = alpha - orientationData.startAlpha;
  beta = beta - orientationData.startBeta;
  cube.style.transform = `translateZ(-${cube.offsetWidth / 2}px) rotateY(${alpha / ratio}deg) rotateX(${-beta / ratio}deg)`;
}

const calcPage = () => {
  dimensions.screenX = window.innerWidth;
  dimensions.screenY = window.innerHeight;
  dimensions.halfScreenX = Math.floor(dimensions.screenX / 2);
  dimensions.halfScreenY = Math.floor(dimensions.screenY / 2);
};

window.onresize = () => calcPage();

window.onload = () => {
  cube = document.querySelector('.cube');

  window.addEventListener("deviceorientation", handleOrientation, true);

  calcPage();
  document.addEventListener('mousemove', e => {
    x = Math.floor((e.clientX - dimensions.halfScreenX) / dimensions.halfScreenX * 100) / 20;
    y = Math.floor((e.clientY - dimensions.halfScreenY) / dimensions.halfScreenY * 100) / -20;
    cube.style.transform = `translateZ(-${cube.offsetWidth / 2}px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
}
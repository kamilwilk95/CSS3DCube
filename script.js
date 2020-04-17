const dimensions = {
  screenX: null,
  screenY: null,
  halfScreenX: null,
  halfScreenY: null,
}

const cube = document.querySelector('.cube');

const calcPage = () => {
  dimensions.screenX = window.innerWidth;
  dimensions.screenY = window.innerHeight;
  dimensions.halfScreenX = Math.floor(dimensions.screenX / 2);
  dimensions.halfScreenY = Math.floor(dimensions.screenY / 2);
};

window.onresize = () => calcPage();

window.onload = () => {

  calcPage();
  console.log('onLoad', dimensions)
  document.addEventListener('mousemove', e => {
    x = Math.floor((e.clientX - dimensions.halfScreenX) / dimensions.halfScreenX * 100) / 20;
    y = Math.floor((e.clientY - dimensions.halfScreenY) / dimensions.halfScreenY * 100) / -20;

    cube.style.transform = `translateZ(-10vw) rotateY(${x}deg) rotateX(${y}deg)`;
  });
}
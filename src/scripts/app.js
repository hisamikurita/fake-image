import { Plane } from './webgl/plane'
import { gsap } from 'gsap';
import { DEVICE } from './constants';

const canvas = document.querySelector('.webgl canvas')
const plane = new Plane(canvas);

// init
plane.init();

// raf
const raf = () => {
  plane.onRaf()
}
gsap.ticker.add(raf)

// loop
if(!DEVICE.isSp()){
  plane.randomPosition()
  setInterval(() => {
    plane.randomPosition()
  }, 3000)  
}

// mouse
if(!DEVICE.isSp()) window.addEventListener('mousemove', (e) => {
  plane.onMouseMove(e)
})

// deviceorientation
if(DEVICE.isSp()) window.addEventListener("deviceorientation", (dat) => {
  plane.onDeviceorientation(dat)
});

// resize
window.addEventListener('resize', () => {
  plane.onResize()
})

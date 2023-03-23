import { Plane } from './webgl/plane'

// parallax

const canvasEls = document.querySelectorAll('.js-parallax canvas')

canvasEls.forEach((canvas) => {
  // init
  const image = canvas.dataset.image;
  const imageMap = canvas.dataset.map;
  const plane = new Plane(canvas, image, imageMap);
  plane.init();

  // observe
  // new IntersectionObserver(entries => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       plane.onEnter();
  //     }
  //     else {
  //       plane.onLeave();
  //     }
  //   });
  // }, {
  //   rootMargin: '0%',
  // }).observe(canvas);

  // resize
  window.addEventListener('resize', () => {
    plane.onResize()
  })
})

import {
  PlaneGeometry,
  RawShaderMaterial,
  Mesh,
  TextureLoader,
  FrontSide
} from 'three'
import { WebglBase } from './webgl-base'
import vertexShader from './plane-shaders/vertexshader.vert'
import fragmentShader from './plane-shaders/fragmentshader.frag'
import { gsap } from 'gsap'

export class Plane extends WebglBase {
  constructor(canvas, image, imageMap) {
    super(canvas)

    this.canvas = canvas;
    this.image = image;
    this.imageMap = imageMap;
    this.raf = this.onRaf.bind(this);
    this.mouse = this.onMouseMove.bind(this);
  }

  init() {
    this._setMesh()
    this._setMeshScale()
  }

  _setMesh() {
    this.canvas.style.background = `url(${this.image}) no-repeat center / cover`

    const texture = new TextureLoader().load(this.image, () => {
      this.plane.material.uniforms.u_texturesize.value.x = texture.image.naturalWidth
      this.plane.material.uniforms.u_texturesize.value.y = texture.image.naturalHeight
    })
    const textureMap = new TextureLoader().load(this.imageMap);

    const geometry = new PlaneGeometry(1, 1, 1, 1)

    const material = new RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_texture: {
          value: texture
        },
        u_textureMap: {
          value: textureMap
        },
        u_texturesize: {
          value: {
            x: 0,
            y: 0
          }
        },
        u_meshsize: {
          value: {
            x: this.width,
            y: this.height
          }
        },
        u_mouse: { 
          value: { 
            x: 0,
            y: 0
          }
        },
      },
      side: FrontSide,
      depthTest: false,
    })
    this.plane = new Mesh(geometry, material)
    this.scene.add(this.plane)
  }

  _setMeshScale() {
    this.plane.scale.x = this.width;
    this.plane.scale.y = this.height;

    this.plane.material.uniforms.u_meshsize.value.x = this.plane.scale.x;
    this.plane.material.uniforms.u_meshsize.value.y = this.plane.scale.y;
  }

  onMouseMove(e) {
    const x = -((e.clientX / this.width) * 2.0 - 1.0);
    const y = ((e.clientY / this.height) * 2.0 - 1.0);

    gsap.to(this.plane.material.uniforms.u_mouse.value, {
      duration: 1.0,
      ease: "power1.out",
      x: x,
      y: y,
    });
  }

  onResize() {
    super.onResize()

    this._setMeshScale();
  }

  onRaf() {
    super.onRaf()
  }

  onEnter(){
    gsap.ticker.add(this.raf)

    window.addEventListener('mousemove', this.mouse)
  }

  onLeave(){
    gsap.ticker.remove(this.raf)

    window.removeEventListener('mousemove', this.mouse)
  }
}

import { PlaneGeometry, RawShaderMaterial, Mesh, TextureLoader, FrontSide } from 'three'
import { WebglBase } from './webgl-base'
import vertexShader from './plane-shaders/vertexshader.vert'
import fragmentShader from './plane-shaders/fragmentshader.frag'
import { gsap } from 'gsap'
import * as dat from 'dat.gui';
import imagePc from '../../images/texture-01.jpg'
import imageSp from '../../images/texture-sp-01.jpg'
import imagePcMap from '../../images/texture-map-01.jpg'
import imageSpMap from '../../images/texture-map-sp-01.jpg'
import { DEVICE } from '../constants'

export class Plane extends WebglBase {
  constructor(canvas) {
    super(canvas)

    this.power = 2.5
    this.image = DEVICE.isSp() ? imageSp : imagePc;
    this.imageMap = DEVICE.isSp() ? imageSpMap : imagePcMap;
  }

  init() {
    this._setMesh()
    this._setMeshScale()
    this._setGui()
  }

  _setMesh() {
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
        u_event: { 
          value: { 
            x: 0,
            y: 0
          }
        },
        u_power: {
          value: this.power
        }
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

  _setGui() {
    const parameter = {
      power: this.power,
    };
    const gui = new dat.GUI();
    gui.add(parameter, 'power', 0.0, 5, 0.1).onChange((value) => {
      this.plane.material.uniforms.u_power.value = value;
    });
  }

  randomPosition(){
    const x = -((this.width * Math.random() / this.width) * 2.0 - 1.0);
    const y = ((this.height * Math.random() / this.height) * 2.0 - 1.0);

    gsap.to(this.plane.material.uniforms.u_event.value, {
      duration: 6.0,
      ease: "power1.out",
      x: x,
      y: y,
    });
  }

  onMouseMove(e) {
    const x = -((e.clientX / this.width) * 2.0 - 1.0);
    const y = ((e.clientY / this.height) * 2.0 - 1.0);

    gsap.to(this.plane.material.uniforms.u_event.value, {
      duration: 1.0,
      ease: "power1.out",
      x: x,
      y: y,
      overwrite: true,
    });
  }

  onDeviceorientation(dat) {
    beta  = dat.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
    gamma = dat.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）

    gsap.to(this.plane.material.uniforms.u_event.value, {
      duration: 1.0,
      ease: "power1.out",
      x: beta,
      y: gamma,
      overwrite: true,
    });
  }

  onResize() {
    super.onResize()

    this._setMeshScale();
  }

  onRaf() {
    super.onRaf()
  }
}

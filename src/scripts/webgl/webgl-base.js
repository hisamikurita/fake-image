import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  MathUtils
} from 'three'

export class WebglBase {
  constructor(canvas) {
    this.wrapper = canvas.parentNode
    this.wrapperRect = this.wrapper.getBoundingClientRect();

    this.renderParam = {
      canvas: canvas,
      alpha: true,
    }
    this.cameraParam = {
      fov: 45,
      near: 0.1,
      far: 100,
      lookAt: new Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 1
    }

    this.dpr = 2.0
    this.scene = null
    this.camera = null
    this.renderer = null
    this.isInitialized = false
    this.rect = null
    this.width = this.wrapperRect.width;
    this.height = this.wrapperRect.height;
    this._baseSetUp()
  }

  _baseSetUp() {
    this._baseSetScene()
    this._baseSetRender()
    this._baseSetCamera()
  }

  _baseSetScene() {
    this.scene = new Scene()
  }

  _baseSetRender() {
    this.renderer = new WebGLRenderer({
      canvas: this.renderParam.canvas,
      alpha: this.renderParam.alpha,
      antialias: false,
      depth: false
    })
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.wrapperRect.width, this.wrapperRect.height)
  }

  _baseSetCamera() {
    if (!this.isInitialized) {
      this.camera = new PerspectiveCamera(
        0,
        0,
        this.cameraParam.near,
        this.cameraParam.far
      )

      this.camera.position.set(
        this.cameraParam.x,
        this.cameraParam.y,
        this.cameraParam.z
      )
      this.camera.lookAt(this.cameraParam.lookAt)
      this.isInitialized = true
    }

    this.wrapperRect = this.wrapper.getBoundingClientRect();
    this.width = this.wrapperRect.width;
    this.height = this.wrapperRect.height;
    this.camera.aspect = this.width / this.height
    this.camera.fov =
      MathUtils.radToDeg(
        Math.atan(this.width / this.camera.aspect / (2 * this.camera.position.z))
      ) * 2
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }

  onResize() {
    this._baseSetCamera()
  }

  onRaf() {
    this.renderer.render(this.scene, this.camera)
  }
}

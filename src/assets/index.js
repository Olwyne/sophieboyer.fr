import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, SpotLight, Clock } from 'three'
import MagicalObject from './MagicalObject'

export default class Webgl {
  constructor () {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // this.camera = new OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
    this.renderer = new WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    this.light = new AmbientLight(0x404040, 2) // soft white light
    this.scene.add(this.light)
    this.spotlight = new SpotLight(0xffffff)
    this.spotlight.position.set(10, 10, -10)
    this.scene.add(this.spotlight)
    this.cube = new MagicalObject()
    this.scene.add(this.cube)

    this.scene.add(this.sky)

    this.camera.position.z = 5
    this.time = 0
    window.addEventListener('resize', this.onResize)
    this.clock = new Clock()
  }

  onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  start () {
    requestAnimationFrame(this.start)
    this.time += 0.01

    this.cube.update()

    this.renderer.render(this.scene, this.camera)
  }
}

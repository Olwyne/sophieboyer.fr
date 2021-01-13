import { Scene, Points, PerspectiveCamera, Vector3, WebGLRenderer, Geometry, TextureLoader, PointsMaterial } from 'three'
let scene, camera, renderer, stars, starGeo, star

export default function init () {
  scene = new Scene()

  camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 1
  camera.rotation.x = Math.PI / 2

  renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  starGeo = new Geometry()
  for (let i = 0; i < 6000; i++) {
    star = new Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    )
    star.velocity = 0
    star.acceleration = 0.001
    starGeo.vertices.push(star)
  }

  const sprite = new TextureLoader().load('/star.png')
  const starMaterial = new PointsMaterial({
    color: 0xaaaaaa,
    size: 0.2,
    map: sprite
  })

  stars = new Points(starGeo, starMaterial)
  scene.add(stars)

  window.addEventListener('resize', onWindowResize, false)

  animate()
}
function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  starGeo.vertices.forEach(p => {
    p.velocity += p.acceleration
    p.y -= p.velocity
    if (p.y < -200) {
      p.y = 200
      p.velocity = 0
    }
  })
  starGeo.verticesNeedUpdate = true
  stars.rotation.y += 0.002

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

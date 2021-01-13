
import { Geometry, Mesh, Vector3, PointsMaterial, Points } from 'three'

export default class MagicalObject extends Mesh {
  constructor () {
    const geometry = new Geometry()
    let star, starGeo
    for (let i = 0; i < 6000; i++) {
      star = new Vector3(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300)
      star.velocity = 0
      star.acceleration = 0.002
      geometry.vertices.push(star)
    }
    const starMaterial = new PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7
    })
    // const material = new MeshBasicMaterial({ color: 0xFF0080, wireframe: false })
    const stars = new Points(starGeo, starMaterial)
    super(stars, starMaterial)
  }

  update () {
    this.rotation.x += 0.01
    this.rotation.y += 0.01
  }
}

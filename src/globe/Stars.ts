import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from 'three'

export default class Stars {
    points: Points
    constructor () {

        this.points = this.setPoints()
    }
    setPoints () {
        
        const geometry = new BufferGeometry()
        const material = new PointsMaterial()

        const nums = 1000
        const vertices = []

        for (let i = 0; i < nums; i++) {
            const x = (Math.random() - 0.5) * 2000
            const y = (Math.random() - 0.5) * 2000
            const z = -Math.random() * 2000
            vertices.push(x, y, z)
        }

        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))

        const points = new Points(geometry, material)
        return points
    }
}
import { BufferGeometry, Float32BufferAttribute, Group, Mesh, MeshBasicMaterial, PointsMaterial, SphereGeometry } from 'three'

const lines = [
    {
        start: { lon: 116.383331, lat: 39.916668 }, // Beijing
        end: { lon: -118.327759, lat: 34.098907 } // Los Angeles
    }

]

export default class Cities {
    main: Group
    radius: number

    pointMesh: Mesh
    constructor (radius: number) {
        this.radius = radius

        this.pointMesh = this.createPointMesh()

        this.main = new Group()
        this.setPoints()

    }
    private createPointMesh () {
        const geometry = new SphereGeometry(.1, 30, 30)
        const material = new MeshBasicMaterial({ color: 0xff0000, })
        const mesh = new Mesh(geometry, material)
        return mesh

    }

    private setPoints () {

        lines.forEach(e => {
            const pointStart = this.createPoint(e.start.lon, e.start.lat)
            const pointEnd = this.createPoint(e.end.lon, e.end.lat)

            this.main.add(pointStart)
            this.main.add(pointEnd)
        })

        // const nums = 1000
        // const vertices = []

    }

    private createPoint (lon: number, lat: number) {
        const point = this.pointMesh.clone()
        
        lon = lon * Math.PI / 180
        lat = lat * Math.PI / 180
    
        const x = this.radius * Math.cos(lat) * Math.cos(lon)
        const z = -this.radius * Math.cos(lat) * Math.sin(lon)
        const y = this.radius * Math.sin(lat)
        point.position.set(x, y, z)
        return point

    }
}
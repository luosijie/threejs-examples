import { BufferGeometry, ShaderMaterial, Float32BufferAttribute, Group, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, PointsMaterial, SphereGeometry, Vector3, CatmullRomCurve3, TubeGeometry } from 'three'

import vertexShader from './shaders/line/vertex.glsl'
import fragmentShader from './shaders/line/fragment.glsl'
const lines = [
    {
        start: { lon: 116.383331, lat: 39.916668 }, // Beijing
        end: { lon: -118.327759, lat: 34.098907 } // Los Angeles
    },
    {
        start: { lon: 28.034088, lat: -26.195246 }, // South Africa
        end: { lon: 151.208755, lat: -33.870453 } // Sydney
    },
    {
        start: { lon: -46.625290, lat:  -23.533773 }, // Brazil
        end: { lon: 2.294694, lat: 48.858093 } // Paris
    }

]

export default class Cities {
    main: Group
    radius: number

    lineMaterial: ShaderMaterial
    pointMesh: Mesh
    constructor (radius: number) {
        this.radius = radius

        this.lineMaterial = this.createLineMaterial()
        this.pointMesh = this.createPointMesh()

        this.main = new Group()
        this.setLines()

    }

    private createLineMaterial () {
        const lineMaterial = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            uniforms: {
                uTime: {
                    value: null
                }
            }
        })
        return lineMaterial
    }

    private createPointMesh () {
        const geometry = new SphereGeometry(.1, 30, 30)
        const material = new MeshBasicMaterial({ color: 0xff0000, })
        const mesh = new Mesh(geometry, material)
        return mesh

    }

    private setLines () {

        lines.forEach(e => {
            // set points
            const pointStart = this.createPoint(e.start.lon, e.start.lat)
            const pointEnd = this.createPoint(e.end.lon, e.end.lat)

            this.main.add(pointStart)
            this.main.add(pointEnd)

            const positionStart = pointStart.position.clone()
            const positionEnd = pointEnd.position.clone()
            const positions = []
            for (let i = 0; i < 50; i++) {
                const position = new Vector3().lerpVectors(positionStart, positionEnd, i / 50)
                // position.normalize()
                position.multiplyScalar(1 + Math.sin(i / 50 * Math.PI) * .8)
                positions.push(position)
            }
            positions.push(positionEnd)

            const path = new CatmullRomCurve3(positions)

            const lineGeometry = new TubeGeometry(path, 50, .03, 12)
        
            // const lineMaterial = new LineBasicMaterial({ color: 0xff0000, linewidth: 1 })
            const line = new Mesh(lineGeometry, this.lineMaterial)
            
            this.main.add(line)
            
            // set line
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

    update (elapsedTime: number) {
        this.lineMaterial.uniforms.uTime.value = elapsedTime
    }
}
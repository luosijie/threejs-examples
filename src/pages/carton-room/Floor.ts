import { BackSide, CircleGeometry, Group, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, PlaneGeometry, Scene, Vector3 } from 'three'

export default class Floor {
    body: Group
    background: Mesh
    circlePink: Mesh
    circleBlue: Mesh
    circleGreen: Mesh

    constructor () {
        this.body = new Group()

        this.background = this.setBackground()
        this.circlePink = this.setCircle(0xe5a1aa, new Vector3(0, -0.29, 0))
        this.circleBlue = this.setCircle(0x8395cd, new Vector3(2, -0.28, 0))
        this.circleGreen = this.setCircle(0x7ad0ac, new Vector3(0, -0.27, 0))

        this.body.add(this.background)
        this.body.add(this.circlePink)
        this.body.add(this.circleBlue)
        this.body.add(this.circleGreen)
    }

    // Crete models from resources
    private setBackground () {
        const geometry = new PlaneGeometry(100, 100)
        const material = new MeshStandardMaterial({
            color: 0xffe6a2,
            side: BackSide
        })
        const plane = new Mesh(geometry, material)
        plane.rotation.x = Math.PI / 2
        plane.position.y = -0.3
        plane.receiveShadow = true
        return plane
    }

    private setCircle (color: number, position: Vector3) {
        const geometry = new CircleGeometry(5, 64)
        const material = new MeshStandardMaterial({ color })
        const mesh = new Mesh(geometry, material)

        mesh.position.set(position.x, position.y, position.z)
        mesh.scale.set(0, 0, 0)
        mesh.rotation.x = -Math.PI / 2

        mesh.receiveShadow = true

        return mesh
    }
}